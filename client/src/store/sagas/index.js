import { fork, all } from 'redux-saga/effects'
import product from '../sagas/product';


export default function* rootSaga() {
  yield all([
    fork(product)
  ])
}