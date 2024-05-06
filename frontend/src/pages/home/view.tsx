import React from 'react';

// Styled-Components
import styled from 'styled-components';

// Components
import Card, { CardInterface } from '../../components/Card'
import PaginateScroll from '../../components/PaginateScroll';

// Interfaces
import { Restaurant } from './Restaurant'
import { TypeHeader } from '../../components/Tag'

// Endpoints
import { getRestaurants } from '../../services/endpoints'

// Helpers
import { parseRestaurants } from './helpers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  text-align: center;
  justify-content: center;
`;

const H1 = styled.h1`
  color: white;
  font-family: Roboto Slab, serif;
  font-size: 3rem;
`;

const ID_BASE = 'home-view';
interface Props {
  restaurants: Restaurant[],
  totalCount: number,
}

const View = (props: Props) => {
  const { restaurants, totalCount } = props;

  const fetchMore: (cursor: number) => Promise<CardInterface[]> = async (cursor: number) => {
    const result = await getRestaurants(cursor, 5);
    return parseRestaurants(result.restaurants);
  }

  return (
    <Container id={`${ID_BASE}-container`}>
      <Header id={`${ID_BASE}-header`}>
        <H1>
          CHOICE A RESTAURANT
        </H1>
      </Header>
      <PaginateScroll
        elements={parseRestaurants(restaurants)}
        fetchMore={fetchMore}
        totalCount={totalCount}
      />
    </Container>
  )
};

export default View;