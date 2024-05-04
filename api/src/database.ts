import mongoose from "mongoose";
import { DB_CONFIG } from './config';

const {
  MONGO_DATABASE,
  // MONGO_USER,
  // MONGO_PASSWORD,
  MONGO_HOST,
} = DB_CONFIG;

(async () => {
  await mongoose.connect(`mongodb://${MONGO_HOST}/${MONGO_DATABASE}`);
  console.log('Database is connected');
})()