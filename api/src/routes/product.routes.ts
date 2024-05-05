import { Router } from 'express';

import {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
} from '../controllers/product.controller';


const router = Router();

router.post('/create-product', createProduct);
router.get('/product/:id', getProduct);
router.put('/product', editProduct);
router.delete('/product/:id', deleteProduct);

export default router;