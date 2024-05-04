import dotenv from "dotenv";

dotenv.config();

export const DB_CONFIG = {
  MONGO_DATABASE: process.env.MONGO_DATABASE || 'demo',
  MONGO_USER: process.env.MONGO_USER || 'visit',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'visit',
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
};

export const API_CONFIG = {
  PORT: process.env.PORT,
};