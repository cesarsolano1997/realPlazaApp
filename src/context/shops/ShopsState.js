import React, {useReducer} from 'react';

import ShopsContext from './ShopsContext';
import ShopsReducer from './ShopsReducer';

import {GET_SHOPS, GET_SHOP_DETAIL, CLEAR_SHOPS} from '../types';

import {fetchWrapper} from '../../utils/fetchWrapper';

const ShopsState = props => {
  const initialState = {
    shops: null,
    shopDetail: null,
    order: true, // true ? ASC : DESC
  };

  const [state, dispatch] = useReducer(ShopsReducer, initialState);

  const getShops = async idMall => {
    try {
      const resp = await fetchWrapper.get(`/shops/listShops/${idMall}`);

      const shops = resp;

      if (shops.Data) {
        dispatch({
          type: GET_SHOPS,
          payload: shops.Data,
        });
      }
    } catch (error) {
      console.log(error);
      if (Platform.OS === 'android') {
        ToastAndroid.show('No se pudo obtener las tiendas', ToastAndroid.SHORT);
      } else {
        AlertIOS.alert('No se pudo obtener las tiendas');
      }
    }
  };

  const getShopDetail = id => {
    dispatch({
      type: GET_SHOP_DETAIL,
      payload: id,
    });
  };

  const clearShops = () => {
    dispatch({
      type: CLEAR_SHOPS,
    });
  };

  // const searchShops = text => {
  //   const shops = state.shops.filter(shop => {
  //     return shop.name.toLowerCase().includes(text.toLowerCase());
  //   });

  //   dispatch({
  //     type: GET_SHOPS,
  //     payload: shops,
  //   });
  // };

  // const orderShops = order => {
  //   let shops;
  //   if (order) {
  //     shops = state.shops.sort((a, b) => {
  //       return a.name.localeCompare(b.name);
  //     });
  //   } else {
  //     shops = state.shops.sort((a, b) => {
  //       return b.name.localeCompare(a.name);
  //     });
  //   }

  //   dispatch({
  //     type: GET_SHOPS,
  //     payload: shops,
  //   });
  // };

  return (
    <ShopsContext.Provider
      value={{
        shops: state.shops,
        shopDetail: state.shopDetail,
        getShops,
        getShopDetail,
        clearShops,
        // searchShops,
        // orderShops,
      }}>
      {props.children}
    </ShopsContext.Provider>
  );
};

export default ShopsState;
