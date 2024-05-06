import React, { useEffect, useState } from 'react';

// Styled-Components
import styled from 'styled-components';

// Interca
import Card, { CardInterface } from '../Card';

const Container = styled.div`
  padding: 2rem;
  background-color: #e4e3de;
  height: 40rem;
  overflow-y: auto;
  border-radius: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  grid-gap: 5rem;
  justify-items: center;
`;

interface Props {
  fetchMore: (cursor: number) => Promise<CardInterface[]>,
  elements: CardInterface[],
  totalCount: number,
}

const ID_CONTAINER = 'paginate-scroll-container';

const PaginateScroll = (props: Props) => {
  const {
    elements,
    fetchMore,
    totalCount,
  } = props;

  const [currentElements, setCurrentElements] = useState(elements || []);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((refetch) && (!loading)) {
      console.log('REFETCH');
      setLoading(true);
      fetchMore(currentElements?.length)
        .then((data) => {
          setCurrentElements((prev) => [...prev, ...data])
          setRefetch(false);
          setLoading(false);
        })
        .catch((e) => {
          console.error('Error on refetch: ', e);
        })
    }
  }, [refetch]);

  useEffect(() => {
    const scrollElement = document.getElementById(ID_CONTAINER);
    if (scrollElement) {
      // Add eventListener for made refetch
      scrollElement.addEventListener(
        'scroll',
        () => {
          const { scrollTop, scrollHeight, clientHeight } = scrollElement;

          // Made refetch query before the scroll reaches the bottom 
          if (scrollTop + 2 * clientHeight >= scrollHeight) {
            setRefetch(true);
          }
        }
      )

    }
  }, []);

  useEffect(() => {
    if (elements) setCurrentElements(elements);
  }, [elements]);

  return (
    <Container id={ID_CONTAINER}>
      <Grid id={`${ID_CONTAINER}-grid`}>
        {
          currentElements.map((element) => (
            <Card
              {...element}
            />
          ))
        }
      </Grid>
    </Container>
  )
};

export default PaginateScroll;