import { Schema, model, Types } from 'mongoose';

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  menu: [{
    type: Types.ObjectId,
    ref: 'product'
  }]
}, {
  versionKey: false
});

export default model('restaurant', restaurantSchema)