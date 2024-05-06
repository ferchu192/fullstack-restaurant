import { CardInterface } from "../../components/Card";
import { TypeHeader } from "../../components/Tag";
import { Restaurant } from "./Restaurant"

export const parseRestaurants = (restaurants: Restaurant[]): CardInterface[] => {
  const result = restaurants.map((restaurant, index) => {
    return {
      title: restaurant.name,
      description: restaurant.description,
      image: restaurant.image,
      headers: [TypeHeader.new],
      key: `restaurant-${index}`
    }
  });
  return result;
}