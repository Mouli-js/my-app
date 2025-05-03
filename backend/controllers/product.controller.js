import Product from '../models/product.model.js';
import mongoose from 'mongoose'

export const getProducts = async(req, res)=>{try {
    const products = await Product.find({});
    res.status(200).json({success: true, data: products})
   }
   catch (error) {
    console.log("error in fetching products");
    res.status(500).json({success: false, message: "Server Error"})
   }}
    

   export const createProducts = async (req, res) => {
    const { name, price, image } = req.body; // Destructure the product fields from the request body

    // Validate required fields
    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: 'Please fill all the required fields' });
    }

    // Validate that price is a number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
        return res.status(400).json({ success: false, message: 'Price must be a valid number' });
    }

    // Create a new product instance with the parsed price
    const newProduct = new Product({ name, price: parsedPrice, image });

    try {
        // Save the new product to the database
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error('Error saving the product:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteProducts =  async(req, res)=>{
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product ID"})
    }

    try{
      await Product.findByIdAndDelete(id);
      res.status(200).json({success: true, messsage: "Product Deleted"})
    }
    catch(error){
        console.log("error in deleting the product");
      res.status(500).json({sucess: false, message: "Product not found"});
    }
};

export const updateProducts = async(req, res)=>{
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product ID"})
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
      res.status(200).json({success: true, data: updatedProduct})
    } catch (error) {
       res.status(500).json({success: false, message: "Unable to update the product"})
    }
}