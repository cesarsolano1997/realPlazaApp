import React, {useReducer} from 'react';

import ShopCartContext from './ShopCartContext';
import ShopCartReducer from './ShopCartReducer';

import {
  ADD_TO_CART,
  TOTAL_PRODUCTS_CART,
  REMOVE_PRODUCT_CART,
  LOAD_TO_CART,
  CALCULATE_PRECI_TOTAL,
} from '../types';

import {
  searchShop,
  insertShopCart,
  deleteTableShopCart,
  deleteShopCart,
} from '../../db/table-ShopCart';
import {
  insertProductShopCart,
  searchProductShopCart,
  updateProductShopCart_Quantity,
  GetAllProductShopCart,
  GetAllProductWithShop,
  GetProductsShopCart_Quantity,
  updateProductShopCart_Quantity_Minus,
  deleteProductShopCart,
  GetAllProductWithShopCondition,
} from '../../db/table-productshopcart';

const ShopCartState = props => {
  const initialState = {
    cart: [],
    totalProducts: 0,
    priceTotal: 0,
  };

  const [state, dispatch] = useReducer(ShopCartReducer, initialState);

  const syncStore = async () => {
    const shopCart = await GetAllProductWithShop();

    if (shopCart) {
      const groupData = shopCart.reduce((acc, cur) => {
        const {idShop, nameShop, ...Product} = cur;
        if (!acc[idShop]) {
          acc[idShop] = {
            idShop,
            nameShop,
            products: [],
          };
        }
        acc[idShop].products.push(Product);
        return acc;
      }, {});

      if (groupData !== null) {
        dispatch({
          type: LOAD_TO_CART,
          payload: Object.values(groupData),
        });
      }

      dispatch({
        type: TOTAL_PRODUCTS_CART,
      });
    }
  };

  const addProduct = async product => {
    // insert data to table shopcart
    // await deleteTableShopCart();
    const resultSearchShopCart = await searchShop(product.idShop);

    // console.log('resultSearchShopCart', resultSearchShopCart);
    if (resultSearchShopCart.length > 0) {
      const resultSearchProductShopCart = await searchProductShopCart(
        product.idShop,
        product.id,
      );

      // console.log('***********************************************');
      // console.log('resultSearchProductShopCart', resultSearchProductShopCart);

      if (resultSearchProductShopCart.length > 0) {
        await updateProductShopCart_Quantity(product.idShop, product.id);
      } else {
        await insertProductShopCart(
          product.id,
          product.idShop,
          product.name,
          product.price,
          product.urlImg,
        );
      }
    } else {
      if (insertShopCart(product.idShop, product.nameShop)) {
        console.log('Insertar los productos');
        await insertProductShopCart(
          product.id,
          product.idShop,
          product.name,
          product.price,
          product.urlImg,
        );
      }
    }

    // console.log(await searchShopCart(product.id));
    // console.log(product);

    // console.log('*******************************************');
    // console.log(await GetAllProductShopCart());
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
    dispatch({
      type: TOTAL_PRODUCTS_CART,
    });

    calculateTotal();
    // console.log('*******************************************');
    // console.log(JSON.stringify(state.cart));
    // console.log('*******************************************');

    //console.log(JSON.stringify(Object.values(groupData)));

    // await AsyncSto1rage.setItem('cart', JSON.stringify(state.cart));
  };

  const removeProduct = async (product, idShop) => {
    product.idShop = idShop;

    const ProductsShopCart_Quantity = await GetProductsShopCart_Quantity(
      idShop,
      product.id,
    );
    console.log('************************************************');
    if (ProductsShopCart_Quantity.length > 0) {
      console.log('Cantidad de producto', ProductsShopCart_Quantity[0]);
      if (ProductsShopCart_Quantity[0].quantity > 1) {
        console.log('Producto con cantidad mayor a 1');
        await updateProductShopCart_Quantity_Minus(idShop, product.id);
      } else {
        console.log('Eliminar el producto');
        await deleteProductShopCart(idShop, product.id);
      }
    }

    const AllProductWithShopCondition = await GetAllProductWithShopCondition(
      idShop,
    );

    console.log('************************************************');
    console.log('AllProductWithShopCondition', AllProductWithShopCondition);

    if (AllProductWithShopCondition.length === 0) {
      await deleteShopCart(idShop);
    }

    dispatch({
      type: REMOVE_PRODUCT_CART,
      payload: product,
    });

    dispatch({
      type: TOTAL_PRODUCTS_CART,
    });

    // await AsyncStorage.setItem('cart', JSON.stringify(state.cart));
    calculateTotal();
  };

  const calculateTotal = async () => {
    dispatch({
      type: CALCULATE_PRECI_TOTAL,
    });
  };

  return (
    <ShopCartContext.Provider
      value={{
        cart: state.cart,
        totalProducts: state.totalProducts,
        priceTotal: state.priceTotal,
        addProduct,
        removeProduct,
        calculateTotal,
        syncStore,
      }}>
      {props.children}
    </ShopCartContext.Provider>
  );
};

export default ShopCartState;
