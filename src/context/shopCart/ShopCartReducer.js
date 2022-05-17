import {
  ADD_TO_CART,
  TOTAL_PRODUCTS_CART,
  LOAD_TO_CART,
  REMOVE_PRODUCT_CART,
  CALCULATE_PRECI_TOTAL,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOAD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_TO_CART:
      const FAKE_STATE = state.cart;

      let structureShop = {};
      const shop = FAKE_STATE.find(
        item => item.idShop === action.payload.idShop,
      );

      if (shop) {
        const product = shop.products.find(
          item => item.id === action.payload.id,
        );

        if (product) {
          product.total += 1;
        } else {
          shop.products.push({
            id: action.payload.id,
            name: action.payload.name,
            urlImg: action.payload.urlImg,
            price: action.payload.price,
            total: 1,
          });
        }
      } else {
        structureShop.idShop = action.payload.idShop;
        structureShop.nameShop = action.payload.nameShop;
        structureShop.products = [
          {
            id: action.payload.id,
            name: action.payload.name,
            urlImg: action.payload.urlImg,
            price: action.payload.price,
            total: 1,
          },
        ];

        FAKE_STATE.push(structureShop);
      }

      return {
        ...state,
        cart: FAKE_STATE,
      };
    case REMOVE_PRODUCT_CART:
      const FAKE_STATE_REMOVE = state.cart;

      const shopRemove = FAKE_STATE_REMOVE.find(
        item => item.idShop === action.payload.idShop,
      );

      if (shopRemove) {
        const productRemove = shopRemove.products.find(
          item => item.id === action.payload.id,
        );

        if (productRemove) {
          productRemove.total -= 1;
          if (productRemove.total === 0) {
            shopRemove.products = shopRemove.products.filter(
              item => item.id !== action.payload.id,
            );
          }
        }

        if (shopRemove.products.length === 0) {
          FAKE_STATE_REMOVE.splice(
            FAKE_STATE_REMOVE.findIndex(
              item => item.idShop === action.payload.idShop,
            ),
          );
        }
      }
      return {
        ...state,
        cart: FAKE_STATE_REMOVE,
      };
    case TOTAL_PRODUCTS_CART:
      let totalProducts = 0;

      state.cart.forEach(item => {
        item.products.forEach(product => {
          totalProducts += product.total;
        });
      });

      return {
        ...state,
        totalProducts: totalProducts,
      };
    case CALCULATE_PRECI_TOTAL:
      let total = 0;
      state.cart.forEach(item => {
        item.products.forEach(product => {
          total += product.total * product.price;
        });
      });
      return {
        ...state,
        priceTotal: total,
      };
    default:
      return state;
  }
};
