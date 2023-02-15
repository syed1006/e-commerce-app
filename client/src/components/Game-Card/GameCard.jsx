import useCart from "../../hooks/useCart";

const GameCard = ({game, index, arr})=>{
    const {cart, setCart} = useCart();
    const url = process.env.REACT_APP_URL ;
    return(
        <div className="game-data">
            <section className="top-section">
                <div className="img-container">
                    <img src={url + '/uploads/' + game.image} alt="" />

                </div>
                <div className="details">
                    <h3 className="game-name">{game.name}</h3>
                    <h5 className="price">{game.price}</h5>
                    <button className="buy-now" id={index} onClick={(e)=>{setCart([...cart, arr[parseInt(e.target.id)]])}}>Buy Now</button>
                </div>
            </section>
            <div className="description">
                <h5>Description</h5>
                <p>{game.description}</p>
            </div>
        </div>
    )
}

export default GameCard;