import React, { useState } from 'react';

// Styled-Components
import styled from 'styled-components';

const CounterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const OperatorBubble = styled.button`
  border-radius: 10rem;
  background: none;
  border: 0px solid;
  color: #4b8fe5;
  font-weight: bold;
  align-items: center;
  cursor: pointer;
  text-align: center;
  font-size: 2rem;
`;

const Count = styled.div`
  border-radius: 24px;
  background-color: #4b8fe5;
  border: 1px solid #e0e0e0;
  color: white;
  font-weight: bold;
  align-items: center;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
`;

interface Props {
  increment: () => void;
  decrement: () => void;
  initValue?: number;
}

const Counter = (props: Props) => {
  const { increment, decrement, initValue } = props;

  const [count, setCount] = useState(initValue || 0);

  const onChange = (operator: string) => {
    let newCount;

    if (operator == 'MINUS') {
      newCount = count - 1;
      decrement();
    }
    else {
      newCount = count + 1;
      increment()
    }

    if (newCount >= 0) {
      setCount(newCount);
    }
  }

  return (
    <CounterContainer id="counter-container">
      <OperatorBubble id="operator-bubble-minus" onClick={() => onChange('MINUS')}>
        -
      </OperatorBubble>
      <Count id="count">
        {
          count || 'ORDER'
        }
      </Count>
      <OperatorBubble id="operator-bubble-plus" onClick={() => onChange('PLUS')}>
        +
      </OperatorBubble>
    </CounterContainer>
  )
};

export default Counter;