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
`;

const Picture = styled.img`
  height: 5rem;
  width: 5rem;
`;

// const Title = styled.h2`
// `;

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
      <h2 id="div-container">
        {title}
      </h2>
      <Picture src={imagePath} />
      {
        headers.map((header, index) => <Tag type={header} key={`${index}`} />)
      }
      <div>
        {description}
      </div>
    </Container>
  )
};

export default Card;