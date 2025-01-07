import mongoose from "mongoose";
import productModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
    const { name, price, image } = req.body; // Destructure the fields from req.body

    // Validate that all required fields are provided
    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: 'Name, price, and image are required.' });
    }

    try {
        // Create a new product instance
        const newProduct = new productModel({ name, price, image });

        // Save the product to the database
        await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Product created successfully.',
            data: newProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message
        });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No product with that id');

    try {
        await productModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message
        });

    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message
        });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No product with that id');
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({
            success: true,
            message: 'Product updated successfully.',
            data: updatedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message
        });

    }
}


























