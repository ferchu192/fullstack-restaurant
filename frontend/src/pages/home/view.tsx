import React from 'react';

// Styled-Components
import styled from 'styled-components';

// Components
import Card from '../../components/Card'

// Interfaces
import { Restaurant } from './Restaurant'
import { TypeHeader } from '../../components/Tag'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem;
  gap: 5rem;
`;

const Header = styled.div`
  text-align: center;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 5rem;
`;

const ID_BASE = 'home-view';

interface Props {
  restaurants: Restaurant[]
}

const View = (props: Props) => {
  const { restaurants } = props;
  return (
    <Container id={`${ID_BASE}-container`}>
      <Header id={`${ID_BASE}-header`}>
        <h1>
          Choice a restaurant
        </h1>
      </Header>
      <Grid id={`${ID_BASE}-grid`}>
        {
          restaurants.map((restaurant, index) => (
            <Card
              key={`restaurant-card-${index}`}
              title={restaurant.name}
              description={restaurant.description}
              headers={[TypeHeader.new]}
              imagePath={"hola"}
            />
          ))
        }
      </Grid>
    </Container>
  )
};

export default View;