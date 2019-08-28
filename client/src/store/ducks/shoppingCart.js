export const Types = {
  ADD_TO_CART : 'ADD_TO_CART',
  REMOVE_TO_CART : 'REMOVE_TO_CART'
}

const initialState = {
  shoppingCartList: [],
  total: 0
}

function addItemToState (state, item) {
  const newState = [ ...state ];
  newState.push(item);
  return newState;
}

function removeItemToState (state, id) {
  const newState = [ ...state ];
  newState.splice(newState.findIndex(n => n.id===id), 1);
  return newState;
}

export default (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case Types.ADD_TO_CART:
      return {shoppingCartList : addItemToState(state.shoppingCartList, payload), total: state.total + payload.price}
    case Types.REMOVE_TO_CART: 
      return {shoppingCartList : removeItemToState(state.shoppingCartList, payload.id), total: state.total - payload.price}
    default:
      return state;
  }
}

export const Creators = {
  addItemToCart: ({ product }) => ({
    type: Types.ADD_TO_CART,
    payload: product
  }),
  removeItemToCart: ({ product }) => ({
    type: Types.REMOVE_TO_CART,
    payload: product
  })

}