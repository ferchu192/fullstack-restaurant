import React from 'react';

// Styled-Components
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
`;

const SpanTitle = styled.span`
  font-weight: bold;
  width: 70%;
  display: flex;
  text-align: left;
`;

const SpanPrice = styled.span`
  display: flex;
  justify-content: end;
  width: 40%;
`;

interface Props {
  title: string;
  cant: number;
  price: number;
}

const Row = (props: Props) => {
  const {
    title,
    cant,
    price,
  } = props;

  return (
    <Container id="row-container">
      <SpanTitle id="row-span-title">
        {`${cant} x `}
        {title}
      </SpanTitle>
      <SpanPrice>
        {`$${price*cant}`}
      </SpanPrice>
    </Container>
  )
};

export default Row;