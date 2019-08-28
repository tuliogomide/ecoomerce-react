import React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MoreIconOut from '@material-ui/icons/AddCircleOutline';
import { Creators as ProductCreators } from '../../store/ducks/product';
import { Creators as ShopCartCreators } from '../../store/ducks/shoppingCart';
import { useDispatch, useSelector } from 'react-redux';



const ProductDetails = ( props ) => {

    const { productItem } = useSelector(
        state => state.product,
    );

    const { shoppingCartList, total:totalCart } = useSelector(
        state => state.shoppingCart,
      );

    const dispatch = useDispatch();

    React.useEffect(() => {
       dispatch(ProductCreators.getProductItemRequest(props.match.params.id));
    }, []);

    var style = {
        container: { 
            marginTop: '100px' 
        },
        button: { 
            paddingLeft: '30px', 
            paddingRight: '30px', 
            fontSize: '20px', 
            backgroundColor: 'rgb(64, 205, 40)' 
        },
    }

    
    const addToCart = function () {
        if (shoppingCartList.filter(n => n.id === productItem.id).length < productItem.quantity) {
            dispatch(ShopCartCreators.addItemToCart({product:{ "id": productItem.id, "title": productItem.title, "price": productItem.price, "picture": productItem.picture }}));
        }
        else {
            alert('Quantidade Indisponível no estoque');
        }
    }

    
    return (<div>
        <Container style={style.container} fixed>
            <Grid spacing={3} container justify="center" >
                <Grid item xs={12} md={6} sm={6} lg={5}>
                    <img src={productItem.picture} width='100%' alt={productItem.title} onError={(e) => { e.target.onerror = null; e.target.src = "../images/error.jpg" }} />

                </Grid>
                <Grid item xs={12} md={6} sm={6} lg={6} >
                    <Grid item xs={12} md={12} sm={12} lg={12} >
                        <Typography gutterBottom variant="h5" component="h5">
                            {productItem.title}
                            <br /><br /><br />
                        </Typography>
                    </Grid>
                    <Grid container justify="center" >
                        <Grid item xs={12} md={6} sm={6} lg={6} >
                            <center>
                                <Typography variant="h4" component="h4">
                                    <b>R$ {parseFloat(productItem.price).toLocaleString("pt-BR", {
                                        // Ajustando casas decimais
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</b>
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Em até 12x sem juros
                  </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={12} md={6} sm={6} lg={6} >
                            <center>
                                <Button color="primary" style={style.button} variant="contained" onClick={addToCart}>
                                    <MoreIconOut />
                                    &nbsp;Comprar
                  </Button>
                            </center>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12} >
                        <Typography variant="subtitle1" gutterBottom>
                            <br /><br />
                            {productItem.description}<br /><br />
                            <b>Memória: </b>{productItem.memory}<br />
                            <b>Marca: </b>{productItem.brand}<br />
                            <b>Tipo do Chip: </b>{productItem.chipType}<br />
                            <br /><br /><br />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </div>)
}

export default ProductDetails
