import { call, put, takeLatest, all } from 'redux-saga/effects'
import api from '../../services/api';
import { Types, Creators } from '../ducks/product';


function* getProducts() {
  try {
    const response = yield call(api.get, '/products');
    if (response.status !== 200) throw new Error(response);
    yield put(Creators.getProductsListSuccess({ products: response.data }))
  } catch (e) {
    yield put(Creators.getProductsListFailure({ error: 'Erro ao buscar na API' }))
  }
}

function* getProductItem({ id }) {
  try {
    const response = yield call(api.get, `/products/${id}`);
    if (response.status !== 200) throw new Error(response);
    yield put(Creators.getProductItemSuccess({ product: response.data }))
  } catch (e) {
    yield put(Creators.getProductItemFailure({ error: 'Erro ao buscar na API' }))
  }
}


export default function* productSagas() {
  yield all([
    takeLatest(Types.GET_PRODUCTS_REQUEST, getProducts),
    takeLatest(Types.GET_PRODUCT_REQUEST, getProductItem),
  ])
}