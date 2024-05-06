import { Router } from 'express';
import {
  paginateRestaurant,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
  getRestaurants,
} from '../controllers/restaurant.controller';

const router = Router();

router.post('/create-restaurant', createRestaurant);
router.get('/restaurants', getRestaurants);
router.post('/restaurant', paginateRestaurant);
router.put('/restaurant', editRestaurant);
router.delete('/restaurant/:id', deleteRestaurant);

export default router;