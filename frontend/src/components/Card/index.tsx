/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';

// Styled-Components
import styled from 'styled-components';

import Tag, { TypeHeader } from '../Tag';

const Container = styled.div`
  height: 15rem;
  width: 15rem;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 8px 24px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  position: relative;

`;

const Picture = styled.img`
  height: 5rem;
  width: 5rem;
`;

const Title = styled.h2`
  text-align: center;
`;

const Description = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const TagContainer = styled.div`
  position: absolute;
  right: 1rem;
  gap: 0.3rem;
  display: flex;
`;
interface Props {
  title: string;
  description: string;
  headers: TypeHeader[];
  imagePath: string;
  key: string;
}

const Card = (props: Props) => {
  const {
    key,
    title,
    description,
    imagePath,
    headers,
  } = props;

  return (
    <Container id="card-container" key={`${key}-${title}`}>
      <Title id="div-container">
        {title}
      </Title>
      <Picture id="picture" src={imagePath} />
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

export default Card;