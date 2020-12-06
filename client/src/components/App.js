import "regenerator-runtime/runtime";
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from '../pages/Main';
import ProductDetails from '../pages/ProductDetails';
import ShoppingCart from '../pages/ShoppingCart';
import SideBar from "./SideBar";
import configureStore from '../store/index';


const { store } = configureStore();

const App = () => {

  return (
    <div>
      <Provider store={store}>
        <Router>
          <SideBar />
          <Route exact path="/" component={Main} />
          <Route exact path="/produtos/:id" component={ProductDetails} />
          <Route exact path="/carrinho" component={ShoppingCart} />
        </Router>
      </Provider>
    </div>
  )
}

export default App



