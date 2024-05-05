import { Router } from 'express';

import {
  getOrder,
  createOrder,
  editOrder,
} from '../controllers/order.controller';

const router = Router();

router.post('/create-order', createOrder);
router.get('/order/:id', getOrder);
router.put('/order', editOrder);

export default router;