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
  background: none;
  border: 0px solid;
  color: #4b8fe5;
  font-weight: bold;
  align-items: center;
  cursor: pointer;
  text-align: center;
  font-size: 1.5rem;
`;

const Count = styled.div<Count>`
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
  width: 75%;
  cursor: ${(props) => props.pointer ? 'pointer' : 'unset'};
  font-size: 1.15rem;
  height: 100%;
`;

interface Count {
  pointer: boolean;
};

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
      <div style={{ width: '20%' }}>
        {
          count > 0 && (
            <OperatorBubble id="operator-bubble-minus" onClick={() => onChange('MINUS')}>
              -
            </OperatorBubble>
          )
        }
      </div>
      <Count id="count" onClick={() => !count && onChange('PLUS')} pointer={!count}>
        {
          count || 'Add to Order'
        }
      </Count>
      <div style={{ width: '20%' }}>
        {
          count > 0 && (
            <OperatorBubble id="operator-bubble-plus" onClick={() => onChange('PLUS')}>
              +
            </OperatorBubble>
          )}
      </div>
    </CounterContainer>
  )
};

export default Counter;