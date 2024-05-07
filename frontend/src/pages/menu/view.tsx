import React from 'react';

// Styled-Components
import styled from 'styled-components';

// Components
import PaginateScroll, { TypeCard } from '../../components/PaginateScroll';

// Interfaces
import { MenuCardInterface } from '../../components/Cards/Menu';
import { Menu } from './Menu';

// Endpoints
import { getMenu } from '../../services/endpoints'

// Helpers
import { parseMenu } from './helpers';

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

const ID_BASE = 'menu-view';

interface Props {
  products: Menu[],
  idRestaurant: string,
}

const View = (props: Props) => {
  const { products, idRestaurant } = props;

  const fetchMore: (cursor: number) => Promise<MenuCardInterface[]> = async (cursor: number) => {
    const result = await getMenu(idRestaurant, cursor, 5);
    return parseMenu(result.menu);
  }

  return (
    <Container id={`${ID_BASE}-container`}>
      <Header id={`${ID_BASE}-header`}>
        <H1>
          MENU
        </H1>
      </Header>
      <PaginateScroll
        elements={parseMenu(products)}
        fetchMore={fetchMore}
        type={TypeCard.menu}
        templateColumns={2}
      />
    </Container>
  )
};

export default View;