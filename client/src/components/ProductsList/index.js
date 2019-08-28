import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProductCreators } from '../../store/ducks/product';

import {    
    Grid, 
    Card, 
    CardActionArea, 
    CardMedia, 
    CardContent, 
    Typography, 
    makeStyles,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    },
});

const ProductsList = () => {

    const { productsList } = useSelector(
        state => state.product,
    );

    const dispatch = useDispatch();

    React.useEffect(() => {
       dispatch(ProductCreators.getProductsListRequest());
    }, []);

    const style = {
        href : {textDecoration: 'none',},
        gridContainer : {marginTop:'100px',},
        cardMedia : {height: 240,},
        title: {
            width: '100%', 
            height: '50px',
            overflow: 'hidden',
            textOverflow: 'ellipsis', 
        },
        
    }

    const classes = useStyles();
    
	return (
			<Grid container spacing={3}>
				{ productsList.map(dados => (		
	    	  			<Grid item xs={12} md={4} sm={6} lg={3} key={dados.id}>	
	    	  			<Link to={`produtos/${dados.id}`} style={style.href}>
	    	  			<Card className={classes.card}>
						    <CardActionArea>
						      <CardMedia
						        component="img"
						        alt="Contemplative Reptile"
						        height="300"
						        image={dados.picture}
						        title="Contemplative Reptile"
						        onError={(e)=>{e.target.onerror = null; e.target.src="./images/error.jpg"}}
						      />
						      <CardContent>
						        <Typography style={style.title} gutterBottom component="div">
						          {dados.title}
						        </Typography>
						        <Typography gutterBottom variant="h6" component="h6">
						          R$ {parseFloat(dados.price.toFixed(2)).toLocaleString("pt-BR",{
    									// Ajustando casas decimais
    									minimumFractionDigits: 2,  
    									maximumFractionDigits: 2
  										})
  									 }
						        </Typography>
						      </CardContent>
						    </CardActionArea>
						</Card>
						</Link>
						</Grid>
	    	  	)) }
	    	</Grid>
	)
}

export default ProductsList