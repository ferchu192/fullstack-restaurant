import { RequestHandler } from 'express';

import Order from '../schemas/order';

/* 
 ---------------------------------- RESTAURANT ----------------------------------
*/
export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    const { products } = body;

    const newOrder = new Order({
      products,
    });

    const saved = await newOrder.save();

    res.json(saved);
  } catch (e) {
    console.error(`[ERROR] - createOrder - error: ${e}`)
    res.status(500).json({ message: e })
  }
}

export const getOrder: RequestHandler = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;

    const order = await Order.findById(id);

    res.json(order);
  } catch (e) {
    console.error(`[ERROR] - getOrder - error: ${e}`)
    res.status(500).json({ message: e })
  }
}

export const editOrder: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    const { id, status } = body;

    const order = await Order.updateOne(
      { _id: id },
      {
        $set: {
          status,
        }
      },
      { runValidators: true }
    )
    res.json(order);
  } catch (e) {
    console.error(`[ERROR] - editOrder - error: ${e}`)
    res.status(500).json({ message: e })
  }
}