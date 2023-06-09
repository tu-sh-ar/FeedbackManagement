import express from 'express'
const router = express.Router();

import { getProduct, createProduct } from '../controller/product_controller';

router.get("/:id", getProduct);
router.post("/", createProduct);

export default router