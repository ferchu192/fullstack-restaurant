/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';

// Styled-Components
import styled from 'styled-components';

import Tag, { TypeHeader } from '../Tag';

const Container = styled.div`
  height: 25rem;
  width: 25rem;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 8px 24px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  position: relative;
  background-color: #fffffff2;
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
`;

const TagContainer = styled.div`
  position: absolute;
  right: 1rem;
  gap: 0.3rem;
  display: flex;
`;
export interface MenuCardInterface {
  title: string;
  description: string;
  price: number;
  type: string;
  image: string;
  ingredients: string[];
  isVegan: boolean;
  isCeliac: boolean;
  headers: TypeHeader[];
  key: string;
  onClick?: () => void;
}

const MenuCard = (props: MenuCardInterface) => {
  const {
    key,
    title,
    description,
    price,
    type,
    image,
    ingredients,
    isVegan,
    isCeliac,
    headers,
    onClick,
  } = props;

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

export default MenuCard;