import React, { useState } from 'react';

// Hooks
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// Icons
import { CiShoppingBasket } from "react-icons/ci";

// Styled-Components
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  margin-top: auto;
`;

const SpanCount = styled.span<SpanProps>`
  border-radius: 2rem;
  background-color: red;
  position: absolute;
  bottom: 0;
  left: 1.5rem;
  width: 1rem;
  text-align: center;
  cursor: default;
  color: white;
  background: ${(props) => props.empty ? 'none' : ''};
`;

const OrderList = styled.div`
  position: absolute;
  z-index: 1;
  background-color: white;
  padding: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 1rem;
  min-width: 10rem;
`;

interface SpanProps {
  empty: boolean;
}

const Shopping = () => {
  const [showList, setShowList] = useState(false);

  const count = useSelector((state: RootState) => state.shop.totalCount);

  const onClick = () => {
    setShowList(!showList);
  }
  return (
    <Container id="shopping-container">
      <CiShoppingBasket
        id="shopping-basket"
        style={{
          color: '#e4e3de',
          fontSize: '2.5rem',
          marginTop: 'auto',
          cursor: 'pointer',
        }}
        onClick={onClick}
      />
      <SpanCount
        id="span-count"
        empty={!count}
        >
        {count || ''}
      </SpanCount>
      {
        showList && (
          <OrderList id="order-list">
            <div>
              Cosa
            </div>
            <div>
              Cosa1
            </div>
            <div>
              Cosa2
            </div>
            <div>
              Cosa3
            </div>
          </OrderList>
        )}
    </Container>
  )
};

export default Shopping;