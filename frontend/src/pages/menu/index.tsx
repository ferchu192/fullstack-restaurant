import React, { useState, useEffect } from 'react';

// Hooks
import { useParams } from 'react-router-dom';

// Enpoint
import { getMenu } from '../../services/endpoints';

// Interfaces
import { MenuCardInterface } from '../../components/Cards/Menu';

// Helpers
import { parseMenu } from './helpers';

// Components
import View from './view';

const Menu = () => {
  const [products, setProducts] = useState([]);

  const { idRestaurant } = useParams();

  const fetchMore: (skip: number) => Promise<MenuCardInterface[]> = async (skip: number) => {
    const result = await getMenu(idRestaurant || '', skip, 4);
    return parseMenu(result.menu);
  }

  useEffect(() => {
    const loadMenu = async () => {
      const result = await getMenu(idRestaurant || '', 0, 6)
      setProducts(result.menu);
    };

    loadMenu()
    return () => { }
  }, [idRestaurant]);

  return <View products={products} fetchMore={fetchMore} />
};

export default Menu;