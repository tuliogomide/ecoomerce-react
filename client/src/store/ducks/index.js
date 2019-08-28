import { combineReducers } from 'redux'
import product from './product'
import shoppingCart from './shoppingCart'

export default () => combineReducers({
  product,
  shoppingCart,
})