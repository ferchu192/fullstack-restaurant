import React, { useEffect, useState } from 'react';

// Hooks
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// Enpoint
import { createOrder } from '../../services/endpoints';

// Icons
import { CiShoppingBasket } from "react-icons/ci";

// Styled-Components
import styled from 'styled-components';
import Row from './Row';

// Interface
import { ShopItem } from '../../store/shopReducer';

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

const SpanTitle = styled.h2`
  text-size: 2rem;
  margin: 0;
`;

const ContainerRow = styled.div`
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
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
  width: 15rem;
`;

const Divider = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  height: 0.01rem;
`;

const SpanTotal = styled.span`
  font-weight: bold;
  width: 100%;
  /* display: flex; */
  text-align: center;
`;

const EmptyMessage = styled.span`
  color: #bcb4b4;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const ButtonOrder = styled.button<ButtonOrder>`
  background: ${(props) => {
    if (props.disabled) return '#e0e0e0'
    else if (props.taked) return '#00a884'
    return '#4b8fe5'
  }} ;
  border: 0px solid;
  color: white;
  font-weight: bold;
  align-items: center;
  cursor: pointer;
  text-align: center;
  font-size: 1.2rem;
  padding: 0.2rem;
  transition: background-color 0.5s ease;

`;
interface SpanProps {
  empty: boolean;
};

interface ButtonOrder {
  taked: boolean;
  disabled: boolean;
};

const Shopping = () => {
  const [showList, setShowList] = useState(false);
  const [products, setProducts] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [taked, setTaked] = useState(false);

  const count = useSelector((state: RootState) => state.shop.totalCount);
  const allProducts = useSelector((state: RootState) => state.shop.products);
  const totalPrice = useSelector((state: RootState) => state.shop.totalPrice);

  const onClick = () => {
    setShowList(!showList);
  }

  const onClickOrder = () => {
    const ids = Object.keys(allProducts)
    const orderProducts = ids.map((product) => ({
      id: product,
      cant: allProducts[product].cant,
      price: allProducts[product].price,
    }));
    setLoading(true);
    createOrder(orderProducts)
      .then((result) => {
        if (result.status == 200) setTaked(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error('error: ', error)
        setLoading(false);
      })
  }

  const onClickOrderAgain = () => {
    setTaked(false);
  }

  useEffect(() => {
    // if (showList) {
    const parse: ShopItem[] = [];
    const keys = Object.keys(allProducts);
    keys.forEach((key) => {
      parse.push(allProducts[key])
    });
    setProducts(parse);
    // }
  }, [allProducts]);

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
            <SpanTitle id="span-title">
              YOUR ORDER
            </SpanTitle>
            <Divider id="divider" />
            <ContainerRow id="container-row">
              {
                products.map((product: ShopItem, index: number) => {
                  return (
                    <Row
                      key={`product-row-${index}`}
                      title={product.name}
                      cant={product.cant}
                      price={product.price}
                    />)
                })
              }
            </ContainerRow>
            {
              !count && (
                <EmptyMessage>
                  Your order is empty. Add some items to create your meal!
                </EmptyMessage>
              )
            }
            <Divider id="divider" />
            <SpanTotal>
              {`TOTAL: $${parseFloat(totalPrice.toFixed(2))}`}
            </SpanTotal>
            <ButtonOrder id="button-order" disabled={!count || loading} onClick={onClickOrder} taked={taked}>
              {
                taked ? 'Taked' : 'Place Order'
              }
            </ButtonOrder>
            {
              taked && (
                <ButtonOrder id="button-take-again" disabled={false} onClick={onClickOrderAgain} taked={false}>
                  Take again
                </ButtonOrder>
              )

            }
          </OrderList>
        )}
    </Container>
  )
};

export default Shopping;