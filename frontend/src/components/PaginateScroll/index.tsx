import React, { useEffect, useState } from 'react';

// Styled-Components
import styled from 'styled-components';
import MenuCard, { MenuCardInterface } from '../Cards/Menu';

// Interca
import RestaurantCard, { RestaurantCardInterface } from '../Cards/Restaurant';

const Container = styled.div`
  padding: 2rem;
  background-color: #e4e3de;
  height: 40rem;
  overflow-y: auto;
  border-radius: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${(props: any) => `repeat(${props['grid-template-columns']}, minmax(200px, 1fr))`};
  grid-gap: 5rem;
  justify-items: center;
`;

interface Props {
  fetchMore: (cursor: number) => Promise<any[]>,
  elements: any[],
  // totalCount: number,
  type: TypeCard,
  templateColumns: number,
}

const ID_CONTAINER = 'paginate-scroll-container';

const PaginateScroll = (props: Props) => {
  const {
    elements,
    fetchMore,
    // totalCount,
    type,
    templateColumns,
  } = props;

  const [currentElements, setCurrentElements] = useState<any[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stopFetching, setStopFetching] = useState(false);

  useEffect(() => {
    if (refetch) {
      fetchMore(currentElements?.length)
        .then((data) => {
          if (!data.length) setStopFetching(true)
          else {
            setCurrentElements((prev) => [...prev, ...data])
            setRefetch(false);
            setLoading(false);
          }
        })
        .catch((e) => {
          console.error('Error on refetch: ', e);
        })
    }
  }, [refetch]);

  useEffect(() => {
    if ((loading) && (!stopFetching)) setRefetch(true)
  }, [loading]);

  useEffect(() => {
    const scrollElement = document.getElementById(ID_CONTAINER);
    if (scrollElement) {
      // Add eventListener for made refetch
      scrollElement.addEventListener(
        'scroll',
        () => {
          const { scrollTop, scrollHeight, clientHeight } = scrollElement;

          // Made refetch query before the scroll reaches the bottom 
          if (scrollTop + 1.01 * clientHeight >= scrollHeight) {
            setLoading(true);
          }
        }
      )

    }
  }, []);

  useEffect(() => {
    if (elements as RestaurantCardInterface[]) setCurrentElements(elements);
    if (elements as MenuCardInterface[]) setCurrentElements(elements);
  }, [elements]);

  const renderType = (type: TypeCard) => {
    switch (type) {
      case 'RESTAURANT':
        return currentElements.map((element) => (
          <RestaurantCard
            {...element}
          />
        ))

      case 'MENU':
        return currentElements.map((element) => (
          <MenuCard
            {...element}
          />
        ))
      default:
        return <></>
    }
  };

  return (
    <Container id={ID_CONTAINER}>
      <Grid id={`${ID_CONTAINER}-grid`} grid-template-columns={templateColumns} >
        {
          renderType(type)
        }
      </Grid>
    </Container>
  )
};

export enum TypeCard {
  restaurant = 'RESTAURANT',
  menu = 'MENU',
}

export default PaginateScroll;