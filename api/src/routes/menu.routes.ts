import { Router } from 'express';
import {
  paginateRestaurant,
  createRestaurant,
  editRestaurant,
} from '../controllers/restaurant.controller';

import {
  getProduct,
  createProduct,
  editProduct,
} from '../controllers/product.controller';

const router = Router();

router.post('/create-restaurant', createRestaurant);
router.post('/restaurant', paginateRestaurant);
router.put('/restaurant', editRestaurant);

router.post('/create-product', createProduct);
router.get('/product', getProduct);
router.put('/product', editProduct);

export default router;