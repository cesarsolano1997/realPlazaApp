import {GET_SHOPS, GET_SHOP_DETAIL, CLEAR_SHOPS} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_SHOPS:
      return {
        ...state,
        shops: action.payload,
      };

    case GET_SHOP_DETAIL:
      const shopDetail = state.shops.find(shop => shop.id === action.payload);
      return {
        ...state,
        shopDetail: shopDetail,
      };
    case CLEAR_SHOPS:
      return {
        shops: null,
        shopDetail: null,
        order: true,
      };
    default:
      return state;
  }
};
