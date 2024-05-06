import React, { useState, useEffect } from 'react';

// Enpoint
import { getRestaurants } from '../../services/endpoints';

// Interface
// import { Restaurant } from './Restaurant';

// Components
import View from './view'

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  const loadRestaurants = async () => {
    const result = await getRestaurants()
    setRestaurants(result?.data);
  };

  useEffect(() => {
    loadRestaurants();
    return () => { }
  }, []);

  return <View restaurants={restaurants} />
};

export default Home;