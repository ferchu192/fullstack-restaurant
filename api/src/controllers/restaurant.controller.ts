import { RequestHandler } from 'express';
import { ObjectId } from 'mongodb';

import Restaurant from '../schemas/restaurant';

/* 
 ---------------------------------- RESTAURANT ----------------------------------
*/
export const createRestaurant: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    const {
      name,
      description,
    } = body;

    const existRestaurant = await Restaurant.findOne({ name: name })

    if (existRestaurant) return res.status(301).json({ message: 'Restaurant already exist' })

    const newRestaurant = new Restaurant({
      name,
      description,
    })

    const saved = await newRestaurant.save();

    res.json(saved);
  } catch (e) {
    console.error(`[ERROR] - createRestaurant - error: ${e}`)
    res.status(500).json({ message: e })
  }
}

export const editRestaurant: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    const {
      id,
      name,
      description,
    } = body;

    const restaurant = await Restaurant.updateOne(
      { _id: id },
      {
        $set: {
          name,
          description,
        }
      }
    )

    res.json(restaurant);
  } catch (e) {
    console.error(`[ERROR] - editRestaurant - error: ${e}`)
    res.status(500).json({ message: e })
  }
}

export const paginateRestaurant: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    const {
      id,
      cursor, // Cursor to the last product
    } = body;

    const idRestaurant = new ObjectId(id);
    const restaurant = await Restaurant.aggregate([
      { $match: { _id: idRestaurant } },
      { $project: { result: { $slice: ["$menu", cursor, 10] } } }
    ]);

    res.json(restaurant)
  } catch (e) {
    console.error(`[ERROR] - paginateRestaurant - error: ${e}`)
    res.status(500).json({ message: e })
  }
}

export const deleteRestaurant: RequestHandler = async (req, res) => {
  try{
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) return res.status(204).json();
    return res.json(restaurant)
  } catch(e) {
    console.error(`[ERROR] - deleteRestaurant - error: ${e}`)
    res.status(500).json({ message: e })
  }
};