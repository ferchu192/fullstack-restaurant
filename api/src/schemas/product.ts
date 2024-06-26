import { Schema, model, Types } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number
  },
  type: {
    type: String
  },
  image: {
    type: String
  },
  ingredients: [{
    type: String,
    name: String
  }],
  isVegan: {
    type: Boolean
  },
  isCeliac: {
    type: Boolean
  }
}, {
  versionKey: false
});

export default model('product', productSchema)