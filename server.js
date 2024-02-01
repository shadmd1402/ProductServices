const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModels');
const cors = require('cors');
const app= express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//route
app.get('/', (req , res)=> {res.send('Hi Shad')})
app.get('/new', (req , res)=> {res.send('Hi new I am is universe')})

// get all products
app.get('/products', async (req,res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get product by id
app.get('/product/:id', async (req , res) => {
    try {
        const {id}= req.params
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// create product
app.post('/product' , async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        console.log('Successfully added');
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update product 
app.put('/product/:id', async (req, res) => {
    try {
        const {id}= req.params;
        const product = await Product.findByIdAndUpdate(id , req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID: ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// delete product by id
app.delete('/product/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find product with ID: ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

mongoose.
connect('mongodb+srv://mdshad83187:Shad123@shadapi.twyiyg7.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected to MongoDB.")
    app.listen(3001 , ()=> {
        console.log('Hello Node Api')
    });
}).catch((error) => {
    console.log(error);
})

