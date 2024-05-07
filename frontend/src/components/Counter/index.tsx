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
  background-color: #437cc5;
  border: 1px solid gray;
  color: white;
  font-weight: bold;
  align-items: center;
  height: 1.2rem;
  cursor: pointer;
`;

const Count = styled.div`
  border-radius: 24px;
  background-color: #437cc5;
  border: 1px solid gray;
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
  update: (newValue: number) => void;
  initValue?: number;
}

const Counter = (props: Props) => {
  const { update, initValue } = props;

  const [count, setCount] = useState(initValue || 0);

  const onChange = (operator: string) => {
    let newCount;

    if (operator == 'MINUS') newCount = count - 1;
    else newCount = count + 1;

    if (newCount >= 0) {
      update(newCount);
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