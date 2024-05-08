import React from 'react';

// Styled-Components
import styled from 'styled-components';

// Components
import PaginateScroll, { TypeCard } from '../../components/PaginateScroll';
import BackLink from '../../components/BackLink';
import Shopping from '../../components/Shopping';

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
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  /* justify-content: center; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-content: space-around;
  width: 100%;
`;

const H1 = styled.h1`
  color: white;
  font-family: Roboto Slab, serif;
  font-size: 3rem;
  margin-top: 0;
`;

const ID_BASE = 'menu-view';

interface Props {
  products: Menu[],
  idRestaurant: string,
}

const View = (props: Props) => {
  const { products, idRestaurant } = props;

  const fetchMore: (skip: number) => Promise<MenuCardInterface[]> = async (skip: number) => {
    const result = await getMenu(idRestaurant, skip, 4);
    return parseMenu(result.menu);
  }

  return (
    <Container id={`${ID_BASE}-container`}>
      <Header id={`${ID_BASE}-header`}>
        <BackLink />
        <H1>
          MENU
        </H1>
        <Shopping />
      </Header>
      <PaginateScroll
        elements={parseMenu(products)}
        fetchMore={fetchMore}
        type={TypeCard.menu}
        emptyMessage="There are no meals for this restaurant. Try another one"
        small={true}
      />
    </Container>
  )
};

export default View;