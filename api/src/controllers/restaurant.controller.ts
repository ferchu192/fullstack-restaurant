import { RequestHandler } from 'express';
import { ObjectId } from 'mongodb';
import product from '../schemas/product';

import Restaurant from '../schemas/restaurant';
import Product from '../schemas/product';

/* 
 ---------------------------------- RESTAURANT ----------------------------------
*/
export const createRestaurant: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    const {
      name,
      description,
      image,
    } = body;

    const existRestaurant = await Restaurant.findOne({ name: name })

    if (existRestaurant) return res.status(301).json({ message: 'Restaurant already exist' })

    const newRestaurant = new Restaurant({
      name,
      description,
      image,
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

export const getRestaurantMenu: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    const {
      id,
      cursor, // Cursor to the last product
      page, // For pagination
    } = body;

    const restaurant = await Restaurant.findById(id)
      .populate({
        path: 'menu',
        options: {
          skip: cursor, // Saltar los primeros 10 elementos
          limit: page // Limitar los resultados a los siguientes 10 elementos del menú
        }
      });
    
    console.log('restaurant: ', restaurant);
    res.send(restaurant)

  } catch (e) {
    console.error(`[ERROR] - getRestaurantMenu - error: ${e}`)
    res.status(500).json({ message: e })
  }
}

export const deleteRestaurant: RequestHandler = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) return res.status(204).json();
    return res.json(restaurant)
  } catch (e) {
    console.error(`[ERROR] - deleteRestaurant - error: ${e}`)
    res.status(500).json({ message: e })
  }
};

// export const getRestaurants: RequestHandler = async(req, res) => {
//   try{
//     const restaurants = await Restaurant.find({}, {name: 1, description: 1, isNew: 1});
//     return res.json(restaurants)
//   } catch(e) {
//     console.error(`[ERROR] - getRestaurants - error: ${e}`)
//     res.status(500).json({ message: e })
//   }
// };

export const getRestaurants: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    const {
      limit,
      cursor, // Cursor to the last product
    } = body;

    const restaurants = await Restaurant.find().skip(cursor).limit(limit);
    const totalCount = await Restaurant.countDocuments();

    res.json({
      restaurants,
      totalCount,
    })
  } catch (e) {
    console.error(`[ERROR] - getRestaurants - error: ${e}`)
    res.status(500).json({ message: e })
  }
};