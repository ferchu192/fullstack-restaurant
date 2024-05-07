import React, { useState, useEffect } from 'react';

// Hooks
import { useParams } from 'react-router-dom';

// Enpoint
import { getMenu } from '../../services/endpoints';

// Interface
// import { Restaurant } from './Restaurant';

// Components
import View from './view';

const Menu = (props: any) => {
  const [products, setProducts] = useState([]);

  const { idRestaurant } = useParams();

  const loadMenu = async () => {
    const result = await getMenu(idRestaurant || '', 0, 5)
    setProducts(result.menu);
  };

  useEffect(() => {
    loadMenu();
    return () => { }
  }, []);

  return <View products={products} idRestaurant={idRestaurant || ''} />
};

export default Menu;