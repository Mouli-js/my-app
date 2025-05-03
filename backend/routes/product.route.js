import express from "express";
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import {getProducts} from '../controllers/product.controller.js';
import {createProducts} from '../controllers/product.controller.js';
import {deleteProducts} from '../controllers/product.controller.js';
import {updateProducts} from '../controllers/product.controller.js';

const router = express.Router();

 router.get("/", getProducts);
 router.post('/', createProducts);
 router.delete("/:id", deleteProducts);
 router.put("/:id", updateProducts );

 export default router;
 