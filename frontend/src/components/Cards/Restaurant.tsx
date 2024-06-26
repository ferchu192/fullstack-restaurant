// Hooks
import { useNavigate } from 'react-router-dom';

// Styled-Components
import styled from 'styled-components';

import Tag, { TypeHeader } from '../Tag';

const Container = styled.div`
  height: 25rem;
  width: 25rem;
  cursor: pointer;
  box-shadow: rgb(249 249 249 / 11%) 0px 8px 24px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  position: relative;
  background-color: rgb(20 61 103);
  color: antiquewhite;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.015);
  }
`;

const Picture = styled.img`
  height: 14rem;
  width: 20rem;
`;
const Title = styled.h2`
  text-align: center;
`;

const Description = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  padding-inline: 1rem;
  font-style: italic;
  color: #faebd7ce;
  padding-top: 1rem;
`;

const TagContainer = styled.div`
  position: absolute;
  right: 1rem;
  gap: 0.3rem;
  display: flex;
`;
export interface RestaurantCardInterface {
  title: string;
  description: string;
  headers: TypeHeader[];
  image: string;
  key: string;
  idRestaurant: string;
}

const RestaurantCard = (props: RestaurantCardInterface) => {
  const {
    key,
    title,
    description,
    image,
    headers,
    idRestaurant,
  } = props;

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/restaurant/${idRestaurant}`);
  };
  
  return (
    <Container id="card-container" key={`${key}-${title}`} onClick={onClick}>
      <Title id="div-container">
        {title}
      </Title>
      <Picture id="picture" src={`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/public/${image}`} />
      {/* <div style={{ height: '15rem', width: '15rem', backgroundColor: '#bab3b373' }} /> */}
      {/* Photo by <a href="https://www.shopify.com/stock-photos/@thenomadbrodie?utm_campaign=photo_credit&amp;utm_content=Browse+Free+HD+Images+of+Restaurant+Entrance+Lights+Vibrant+Alleyway&amp;utm_medium=referral&amp;utm_source=credit">Brodie</a> from <a href="https://www.shopify.com/stock-photos/restaurant?utm_campaign=photo_credit&amp;utm_content=Browse+Free+HD+Images+of+Restaurant+Entrance+Lights+Vibrant+Alleyway&amp;utm_medium=referral&amp;utm_source=credit">Burst</a> */}
      <TagContainer id="tag-container">
        {
          headers.map((header, index) => <Tag type={header} key={`${index}`} />)
        }
      </TagContainer>
      <Description id="description">
        {description}
      </Description>
    </Container>
  )
};

export default RestaurantCard;