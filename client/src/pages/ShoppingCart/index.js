import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MoreIconOut from '@material-ui/icons/AddCircleOutline';
import RemoveIconOut from '@material-ui/icons/RemoveCircleOutline';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProductCreators } from '../../store/ducks/product';
import { Creators as ShopCartCreators } from '../../store/ducks/shoppingCart';
import { Button } from '@material-ui/core';


const ShoppingCart = () => {

  var style = {
    container: { marginTop: '100px' },
  }

  const dispatch = useDispatch();


  const { productsList } = useSelector(
    state => state.product,
  );

  const { shoppingCartList, total } = useSelector(
    state => state.shoppingCart,
  );

  var results = shoppingCartList.reduce(function (results, org) {
    (results[org.id] = results[org.id] || []).push(org);
    return results;
  }, {})
  var result = Object.keys(results).map(function (key) {
    return results[key];
  });

  const addToCart = function (productItem) {
    var product = productsList.find(n => n.id === productItem.id);
    if (shoppingCartList.filter(n => n.id === productItem.id).length < product.quantity) {
      dispatch(ShopCartCreators.addItemToCart({ product: { "id": productItem.id, "title": productItem.title, "price": productItem.price, "picture": productItem.picture } }));
    }
    else {
      alert('Quantidade Indisponível no estoque');
    }
  }
  const removeToCart = function (productItem) {
    if (shoppingCartList.filter(n => n.id === productItem.id).length > 0) {
      dispatch(ShopCartCreators.removeItemToCart({ product: { "id": productItem.id, "price": productItem.price } }));
    }
    else {
      alert('Quantidade Indisponível no estoque');
    }
  }


  return (<div>
    <Container style={style.container} fixed>
      <Grid spacing={3} container justify="center" >
        <Grid item xs={12} md={8} sm={8} lg={8}>
          {result.map(p => (
            <Grid key={p[0].id} item xs={12} md={12} sm={12} lg={12} style={{ borderBottom: '1px solid #d8d8d8', padding: '20px' }}>
              <Grid container spacing={5} >
                <Grid item xs={3} md={2} sm={2} lg={2} >
                  <img src={p[0].picture} width='100%' alt={p[0].title} style={{ float: 'left' }} onError={(e) => { e.target.onerror = null; e.target.src = "../images/error.jpg" }} />
                </Grid>
                <Grid item xs={8} md={8} sm={8} lg={8}>
                  <Grid container justify="center" spacing={3}>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <Typography style={{ float: 'left', marginLeft: '10px', marginRight: '10px' }} variant="body2" gutterBottom>{p[0].title}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <center>
                        <RemoveIconOut style={{ float: 'left', cursor: 'pointer', fontSize: '30px', color: '#3f51b5' }} onClick={() => removeToCart(p[0])} />
                        <Typography style={{ float: 'left', marginLeft: '10px', marginRight: '10px' }} variant="subtitle1" gutterBottom>{p.length}</Typography>
                        <MoreIconOut style={{ float: 'left', cursor: 'pointer', fontSize: '30px', color: '#3f51b5' }} onClick={() => addToCart(p[0])} />
                        <Typography style={{ float: 'left', marginLeft: '20px' }} variant="subtitle1" gutterBottom><b>R$ {parseFloat((p[0].price * p.length)).toLocaleString("pt-BR", {
                          // Ajustando casas decimais
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}</b>
                        </Typography>
                      </center>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} md={4} sm={4} lg={4} style={{ backgroundColor: '#f8f8f8', padding: '20px', height: '300px', marginBottom: '20px' }}>
          <Typography variant="h5" style={{ color: '#333' }} gutterBottom>
            Resumo do pedido
						</Typography>
          <br />
          <div style={{ borderBottom: '1px solid #d8d8d8', color: '#666' }}>
            <Typography variant="body2" gutterBottom style={{ float: 'left' }}>
              Subtotal ({shoppingCartList.length} produtos)
						</Typography>
            <Typography variant="body2" gutterBottom style={{ float: 'right' }}>
              R$ {parseFloat((total)).toLocaleString("pt-BR", {
              // Ajustando casas decimais
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}

            </Typography>

            <br /><br />

            <Typography variant="body2" gutterBottom style={{ float: 'left' }}>
              Frete
						</Typography>
            <Typography variant="body2" gutterBottom style={{ float: 'right' }}>
              --
						</Typography>
            <br /><br />
          </div>
          <br />
          <div style={{ color: '#333', borderBottom: '1px solid #d8d8d8', }}>
            <Typography variant="h6" gutterBottom style={{ float: 'left' }}>
              <b>Total</b>
            </Typography>
            <Typography variant="h6" gutterBottom style={{ float: 'right' }}>
              {console.log(shoppingCartList)}
              <b>R$ {parseFloat((total)).toLocaleString("pt-BR", {
                // Ajustando casas decimais
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</b>
            </Typography>
            <br /><br />
          </div>
          <center>
            <Button variant="contained" onClick={() => { }} color="secondary" style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '10px', backgroundColor: 'rgb(64, 205, 40)' }}>
              finalizar compra
                        </Button>
          </center>
          <br />

        </Grid>

      </Grid>
    </Container>
  </div>)
}

export default ShoppingCart
