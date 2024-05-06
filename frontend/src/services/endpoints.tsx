import axios from 'axios';

interface RestaurantResponse {
  restaurants: any,
  totalCount: number,
}

export const getRestaurants = async (cursor: Number, limit: Number): Promise<RestaurantResponse> => {
  const path = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/restaurants`;
  const result = await axios.post(path, { cursor, limit });
  return {
    restaurants: result?.data?.restaurants || [],
    totalCount: result?.data?.totalCount || 10,
  };
}