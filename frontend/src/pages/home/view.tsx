// Styled-Components
import styled from 'styled-components';

// Components
import PaginateScroll, { TypeCard } from '../../components/PaginateScroll';

// Interfaces
import { Restaurant } from './Restaurant'

// Helpers
import { parseRestaurants } from './helpers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  justify-content: center;
`;

const H1 = styled.h1`
  color: antiquewhite;
  font-family: Roboto Slab, serif;
  font-size: 3rem;
`;

const ID_BASE = 'home-view';
interface Props {
  restaurants: Restaurant[],
  fetchMore: (cursor: number) => Promise<any[]>,
}

const View = (props: Props) => {
  const { restaurants, fetchMore } = props;

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
        type={TypeCard.restaurant}
        emptyMessage="No restaurants available at the moment"
        small={false}
      />
    </Container>
  )
};

export default View;