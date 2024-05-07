import axios from 'axios';

interface RestaurantResponse {
  restaurants: any,
  totalCount: number,
}

interface MenuResponse {
  menu: any,
  totalCount: number,
}

export const getRestaurants = async (skip: Number, limit: Number): Promise<RestaurantResponse> => {
  const path = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/restaurants`;
  const result = await axios.post(path, { skip, limit });
  return {
    restaurants: result?.data?.restaurants || [],
    totalCount: result?.data?.totalCount || 10,
  };
}

export const getMenu = async (idRestaurant: string, skip: Number, limit: Number): Promise<MenuResponse> => {
  const path = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/restaurant`;
  const result = await axios.post(path, { id: idRestaurant, skip, limit });
  return {
    menu: result?.data?.menu,
    totalCount: result?.data?.totalCount,
  };
}