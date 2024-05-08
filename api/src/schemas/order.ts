import { Schema, model, Types } from 'mongoose';

const orderSchema = new Schema({
  products: [
    {
      id: {
        type: Types.ObjectId,
        required: true
      },
      cant: {
        type: Number,
        default: 1
      },
    }],
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['taken', 'cooking', 'done'],
    default: 'taken' // Valor por defecto
  }
});

export default model('Order', orderSchema);