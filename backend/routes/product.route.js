

import express from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

// Route to create a new product
router.post('/create', createProduct);

//delete product
router.delete('/:id', deleteProduct);
//get all products
router.get('/get-all', getAllProducts);

//update product
router.put('/:id', updateProduct);
export default router;