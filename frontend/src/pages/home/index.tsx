import React, { useState, useEffect } from 'react';

// Enpoint
import { getRestaurants } from '../../services/endpoints';

// Interface
// import { Restaurant } from './Restaurant';

// Components
import View from './view'

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const loadRestaurants = async () => {
    const result = await getRestaurants(0, 5)
    setRestaurants(result.restaurants);
    setTotalCount(result.totalCount);
  };

  useEffect(() => {
    loadRestaurants();
    return () => { }
  }, []);

  return <View restaurants={restaurants} totalCount={totalCount} />
};

export default Home;