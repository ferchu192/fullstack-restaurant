import { useState, useEffect } from 'react';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { useParams } from 'react-router-dom';

// Redux
import { RootState } from '../../store';
import { addNewMenu } from '../../store/menuReducer';

// Enpoint
import { getMenu } from '../../services/endpoints';

// Interfaces
import { MenuCardInterface } from '../../components/Cards/Menu';
import { Menu as MenuInterface } from './Menu';

// Helpers
import { parseMenu } from './helpers';

// Components
import View from './view';

const Menu = () => {
  const [products, setProducts] = useState<MenuInterface[]>([]);
  const [mount, setMount] = useState(false);

  const { idRestaurant } = useParams();

  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const cacheMenus = useSelector((state: RootState) => state.menus.menus);

  const fetchMore: (skip: number) => Promise<MenuCardInterface[]> = async (skip: number) => {
    const result = await getMenu(idRestaurant || '', skip, 4);
    dispatch(addNewMenu({ newMenus: result.menu }));
    return parseMenu(result.menu);
  }

  useEffect(() => {
    if ((mount) && (!cacheMenus.length) && (dispatch)) {
      const loadMenu = async () => {
        const result = await getMenu(idRestaurant || '', 0, 6)
        dispatch(addNewMenu({ newMenus: result.menu }));
        setProducts(result.menu);
      };

      loadMenu()
    } else {
      setProducts(cacheMenus);
    }
    return () => {
      setMount(true);
    }
  }, [idRestaurant, dispatch, mount, cacheMenus]);

  return <View products={products} fetchMore={fetchMore} />
};

export default Menu;