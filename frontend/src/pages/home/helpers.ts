import { RestaurantCardInterface } from "../../components/Cards/Restaurant";
import { TypeHeader } from "../../components/Tag";
import { Restaurant } from "./Restaurant"

export const parseRestaurants = (restaurants: Restaurant[]): RestaurantCardInterface[] => {
  const result = restaurants.map((restaurant, index) => {
    return {
      title: restaurant.name,
      description: restaurant.description,
      image: restaurant.image,
      headers: [TypeHeader.new],
      key: `restaurant-${index}`,
      idRestaurant: restaurant._id,
    }
  });
  return result;
}