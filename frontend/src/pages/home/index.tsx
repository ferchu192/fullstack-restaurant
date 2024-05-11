import { useState, useEffect } from 'react';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';

// Redux
import { RootState } from '../../store';
import { addNewRestaurants } from '../../store/restaurantReducer';

// Enpoint
import { getRestaurants } from '../../services/endpoints';

// Interfaces
import { RestaurantCardInterface } from '../../components/Cards/Restaurant'
import { Restaurant } from './Restaurant';

// Helpers
import { parseRestaurants } from './helpers';

// Components
import View from './view'

const Home = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [mount, setMount] = useState(false);

  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const cacheRestaurants = useSelector((state: RootState) => state.restaurants.restaurants);

  // Queries
  const fetchMore: (skip: number) => Promise<RestaurantCardInterface[]> = async (skip: number) => {
    const result = await getRestaurants(skip, 6);
    dispatch(addNewRestaurants({ newRestaurants: result.restaurants }));
    return parseRestaurants(result.restaurants);
  }

  useEffect(() => {
    if ((mount) && (!cacheRestaurants.length) && (dispatch)) {
      const loadRestaurants = async () => {
        const result = await getRestaurants(0, 6)
        setRestaurants(result.restaurants);
        dispatch(addNewRestaurants({ newRestaurants: result.restaurants }));
      };

      loadRestaurants();
    } else {
      setRestaurants(cacheRestaurants);
    } 
    return () => {
      setMount(true);
    }
  }, [cacheRestaurants, dispatch, mount]);

  return <View restaurants={restaurants} fetchMore={fetchMore} />
};

export default Home;