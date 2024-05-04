import mongoose from "mongoose";
import { DB_CONFIG } from './config';

const {
  MONGO_DATABASE,
  // MONGO_USER,
  // MONGO_PASSWORD,
  MONGO_HOST,
} = DB_CONFIG;

(async () => {
  try {
    const nameDB = `mongodb://${MONGO_HOST}/${MONGO_DATABASE}`;
    const db = await mongoose.connect(nameDB);
    console.log('db: ', db.connection.name);
    console.log('Database is connected');
  } catch(e) {
    console.error(e)
  }
})()