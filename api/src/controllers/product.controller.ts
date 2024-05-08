import { RequestHandler } from 'express';
// import { Types } from 'mongoose';

import Restaurant from '../schemas/restaurant';
import Product from '../schemas/product';
import { DB_CONFIG } from '../config';

/* 
 ---------------------------------- PRODUCT ----------------------------------
*/

export const getProduct: RequestHandler = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;

    const product = await Restaurant.findOne({ _id: id })
    res.json(product);
  } catch (e) {
    console.error(`[ERROR] - getProduct - error: ${e}`)
    res.status(500).json({ message: e })
  }
}

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    const {
      restaurantId,
      name,
      description,
      price,
      type,
      ingredients,
      isVegan,
      isCeliac,
      image,
    } = body;

    const existRestaurant = await Restaurant.findOne({ _id: restaurantId })
    if (!existRestaurant) return res.status(301).json({ message: "Restaurant don't exist" })

    const newProduct = new Product({
      name,
      description,
      price,
      type,
      ingredients,
      isVegan,
      isCeliac,
      image,
    });

    const saved = await newProduct.save();

    // Update restaurant
    await Restaurant.updateOne(
      { _id: restaurantId },
      { $push: { menu: saved._id } }
    )

    res.json(saved);
  } catch (e) {
    console.error(`[ERROR] - createProduct - error: ${e}`)
    res.status(500);
  }
}

export const editProduct: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    const {
      id,
      name,
      description,
      price,
      type,
      ingredients,
      isVegan,
      isCeliac,
      image,
    } = body;

    const product = await Product.updateOne(
      { _id: id },
      {
        $set: {
          name,
          description,
          price,
          type,
          ingredients,
          isVegan,
          isCeliac,
          image,
        }
      }
    )
    res.json(product);
  } catch (e) {
    console.error(`[ERROR] - editProduct - error: ${e}`)
    res.status(500).json({ message: e })
  }
}

export const deleteProduct: RequestHandler = async (req, res) => {
  try{
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(204).json();
    return res.json(product)
  } catch(e) {
    console.error(`[ERROR] - deleteProduct - error: ${e}`)
    res.status(500).json({ message: e })
  }
};