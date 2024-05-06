import { Router } from 'express';
import {
  getRestaurantMenu,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
  getRestaurants,
} from '../controllers/restaurant.controller';

const router = Router();

router.post('/create-restaurant', createRestaurant);
router.post('/restaurants', getRestaurants); // Paginate only Restaurants
router.post('/restaurant', getRestaurantMenu); // Paginate the menus of a Restaurant
router.put('/restaurant', editRestaurant);
router.delete('/restaurant/:id', deleteRestaurant);

export default router;