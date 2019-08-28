export const Types = {
  GET_PRODUCTS_REQUEST: 'GET_PRODUCTS_REQUEST',
  GET_PRODUCTS_SUCCESS: 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_FAILURE: 'GET_PRODUCTS_FAILURE',

  GET_PRODUCT_REQUEST: 'GET_PRODUCT_REQUEST',
  GET_PRODUCT_SUCCESS: 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_FAILURE: 'GET_PRODUCT_FAILURE',
}

const initialState = {
  // Lista de produtos
  productsList: [],
  productsListLoading: false,
  productsListError: '',
  // Item produto
  productItem: {},
  productItemLoading: false,
  productItemError: '',

}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_PRODUCTS_REQUEST:
      return { ...state, productsListLoading: true, productsListError: '' };
    // Trouxe com sucesso
    case Types.GET_PRODUCTS_SUCCESS:
      return { ...state, productsList: action.payload, productsListLoading: false, productsListError: '' };
    case Types.GET_PRODUCTS_FAILURE:
      return { ...state, productsListLoading: false, productsListError: action.payload };
    
    // Produto Item
    case Types.GET_PRODUCT_REQUEST:
      return { ...state, productItemLoading: true, productItemError: '' };
    // Trouxe com sucesso
    case Types.GET_PRODUCT_SUCCESS:
      return { ...state, productItem: action.payload, productItemLoading: false, productItemError: '' };
    case Types.GET_PRODUCT_FAILURE:
      return { ...state, productItemLoading: false, productItemError: action.payload };
    default:
      return state;
  }
}

export const Creators = {
  getProductsListRequest: () => ({
    type: Types.GET_PRODUCTS_REQUEST,
  }),
  getProductsListSuccess: ({ products }) => ({
    type: Types.GET_PRODUCTS_SUCCESS,
    payload: products
  }),
  getProductsListFailure: ({ error }) => ({
    type: Types.GET_PRODUCTS_FAILURE,
    payload: error
  }),

  getProductItemRequest: (id) => ({
    type: Types.GET_PRODUCT_REQUEST,
    id
  }),
  getProductItemSuccess: ({ product }) => ({
    type: Types.GET_PRODUCT_SUCCESS,
    payload: product
  }),
  getProductItemFailure: ({ error }) => ({
    type: Types.GET_PRODUCT_FAILURE,
    payload: error
  }),

}