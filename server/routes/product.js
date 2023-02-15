const router = require('express').Router();
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/handleImages');

router.get('/', async (req,res)=>{
    const {page = 1} = req.query;
    try{
        let totalResults = await Product.find().count()
        let data = await Product.find().skip((page-1) * 5).limit(5);
        
        res.status(200).json({
            status: 'Success',
            totalResults,
            result: [...data]
        });
    }
    catch(e){
        res.status(500).json({
            status: 'Failure',
            message: e.message
        })
    }
})

router.post('/',upload, [
    body('name', "Name should be of min 5 characters!!" ).isLength({min: 5}),
    body('description', "Description shpuld be of min 5 characters").isLength({min: 5}),
    body('count').isNumeric(),
    body('price').isNumeric()
], (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: 'Failure',
            message: errors.array()
        })
    }
    const obj = {
        name: req.body.name,
        description: req.body.description,
        image: req.file.filename,
        count: req.count,
        price: req.price
    }
    Product.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.status(201).json({
                status: 'Success',
                message: 'Post created successfully',
                item
            })
        }
    });
});

router.put('/:id', async (req, res)=>{
    console.log(req.body)
    try{
        let product = await Product.updateOne({'_id' : req.params.id}, {$set : req.body})
        return res.status(202).json({
            status: 'Success',
            result: product
        })
    }catch(e){
        return res.status(500).json({
            status: 'Failure',
            message: e.message
        })
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        
        let product = await Product.deleteOne({ "_id": req.params.id})
        return res.status(202).json({
            status: 'Success',
            result: product
        })
    }catch(e){
        return res.status(500).json({
            status: 'Failure',
            message: e.message
        })
    }
})

module.exports = router