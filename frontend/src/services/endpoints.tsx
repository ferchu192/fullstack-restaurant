import axios from 'axios';

export const getRestaurants = async () => {
  const path = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/restaurants`;
  const result = await axios.get(path);
  return result;
}