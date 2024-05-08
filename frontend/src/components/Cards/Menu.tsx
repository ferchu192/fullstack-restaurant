/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';

// Hooks
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addProduct, decrementProduct } from '../../store/shopReducer';

// Styled-Components
import styled from 'styled-components';

// Components
import Tag, { TypeHeader } from '../Tag';
import Counter from '../Counter';

const Container = styled.div`
  height: 15rem;
  width: 35rem;
  /* cursor: pointer; */
  box-shadow: rgb(255 255 255 / 7%) 0px 8px 24px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 0.5rem;
  padding: 1rem;
  position: relative;
  background-color: rgb(20 61 103);
  color: #dddddd;
`;

const Picture = styled.img`
  height: 7rem;
  width: 12rem;
`;
const Title = styled.h2`
`;

const DescriptionContainer = styled.div`
  display: flex;
`;

const Description = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  height: fit-content;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 2rem;
  padding-inline: 1rem;
  font-style: italic;
`;

const IngredientsContainer = styled.div`
  display: flex;
`;

const Ingredients = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  padding-inline: 1rem;
  height: fit-content;
  color: #a09f9f;
`;

const Price = styled.span`
  text-align: end;
`;

const Footer = styled.div`
  display: flex;
  height: 2rem;
  align-items: center;
  margin-top: auto;
`;

const CounterContainer = styled.div`
  width: 12rem;
  margin-top: auto;
`;

const PriceContainer = styled.div`
  width: 60%;
  text-align: end;
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
  idProduct: string;
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
    headers,
    onClick,
    idProduct,
  } = props;

  const dispatch = useDispatch<AppDispatch>();

  return (
    <Container id="card-container" key={`${key}-${title}`} onClick={onClick}>
      <Title id="div-container">
        {title}
      </Title>
      <TagContainer id="tag-container">
        {
          headers.map((header, index) => <Tag type={header} key={`${index}`} />)
        }
      </TagContainer>
      <DescriptionContainer id="description-container">
        <Picture id="picture" src={`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/public/${image}`} />
        <TextContainer id="text-container">
          <Description id="description">
            {description}
          </Description>
          <IngredientsContainer id="ingredients-container">
            <span>Ingredients:</span>
            <Ingredients id="ingredients">
              {
                ingredients.map((ingredient, index) => {
                  if (ingredients?.length - 1 <= index) return `${ingredient}`
                  return `${ingredient}, `
                })
              }
            </Ingredients>
          </IngredientsContainer>
        </TextContainer>
      </DescriptionContainer>
      <Footer id="footer">
        <CounterContainer id="menu-counter-container">
          <Counter
            increment={() => dispatch(addProduct({ id: idProduct, name: title, price }))}
            decrement={() => dispatch(decrementProduct({id: idProduct, name: title, price}))}
          />
        </CounterContainer>
        <PriceContainer id="price-container">
          <Price id="price">
            {`$${price}`}
          </Price>
        </PriceContainer>
      </Footer>
    </Container>
  )
};

export default MenuCard;