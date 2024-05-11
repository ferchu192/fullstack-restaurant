import React, { useState, useEffect } from 'react';

// Enpoint
import { getRestaurants } from '../../services/endpoints';

// Interfaces
import { RestaurantCardInterface } from '../../components/Cards/Restaurant'

// Helpers
import { parseRestaurants } from './helpers';

// Components
import View from './view'

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchMore: (skip: number) => Promise<RestaurantCardInterface[]> = async (skip: number) => {
    const result = await getRestaurants(skip, 5);
    return parseRestaurants(result.restaurants);
  }

  useEffect(() => {
    const loadRestaurants = async () => {
      const result = await getRestaurants(0, 6)
      setRestaurants(result.restaurants);
    };

    loadRestaurants();
    return () => { }
  }, []);

  return <View restaurants={restaurants} fetchMore={fetchMore} />
};

export default Home;