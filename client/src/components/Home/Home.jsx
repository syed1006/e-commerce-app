import { useState, useEffect } from "react"
import useAuth from "../../hooks/useAuth";
import GameCard from "../Game-Card/GameCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoginMessage from "../LoginMessage/LoginMessage";

const Home = () => {
    const [state, setState] = useState({ games: [], page: 1, totalResults: 0 });
    const url = process.env.REACT_APP_URL;
    let token = localStorage.getItem('auth-token');
    const role = localStorage.getItem('role');
    const { setAuth } = useAuth();

    const fetchGames = async () => {
        try {
            const response = await fetch(url + `/product?page=${state.page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            })
            const res = await response.json();
            console.log(res);
            if (res.status === 'success') {
                setAuth({ token, role });
                setState({ games: state.games.concat(res.result), page: state.page + 1, totalResults: res.totalResults })
            }
            if (res.message === "jwt expired") {
                setAuth({ token: "", role: "" });
                setState({ games: [], page: 1, totalResults: 0 });
                token = false
                localStorage.removeItem('token');
                localStorage.removeItem('role');
            }

        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetchGames()
    }, [])

    if (!token || token === undefined) {
        return (
            <LoginMessage/>
        )
    }
    if (state.totalResults === 0) {
        return (
            <h1 style={{ color: 'green', textAlign: 'center' }}>No products available currently.</h1>
        )
    }
    return (
        <main>
            <InfiniteScroll
                dataLength={state.games.length} //This is important field to render the next data
                next={fetchGames}
                hasMore={state.games.length < state.totalResults}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {state.games.map((game, index)=>{
                    return <GameCard key={index} game={game} index={index} arr={state.games}/>
                })}
            </InfiniteScroll>
        </main>
    )
}

export default Home;