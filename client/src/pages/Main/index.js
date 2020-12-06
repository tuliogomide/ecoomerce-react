import React from 'react';
import ProductsList from '../../components/ProductsList';
import { Container } from '@material-ui/core';




const Main = () => {
  return (
    <Container style={{ marginTop: 100 }}>
      <ProductsList />
    </Container>
  )
}

export default Main