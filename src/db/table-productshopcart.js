import {enablePromise} from 'react-native-sqlite-storage';

import {getDBConnection, GetValues} from './db-service';

enablePromise(true);

export const createTableProductShopCart = async () => {
  try {
    const db = await getDBConnection();
    await db.executeSql(`CREATE TABLE IF NOT EXISTS productshopcart (
                  idProduct data_type INTEGER,
                  idShop data_type INTEGER,
                  nameProduct data_type TEXT,
                  urlImgProduct data_type TEXT,
                  price data_type REAL,
                  quantity data_type INTEGER,
                  FOREIGN KEY (idShop) REFERENCES shopcart(idShop)
              )`);
    console.log('createTableProductShopCart ok');
    return true;
  } catch (error) {
    console.error('createTableProductShopCart error', error);
    return false;
  }
};

export const insertProductShopCart = async (
  idProduct,
  idShopCart,
  nameProduct,
  price,
  urlImg,
) => {
  try {
    const db = await getDBConnection();
    const result = await db.executeSql(
      `INSERT INTO productshopcart (idProduct, idShop, nameProduct, price, urlImgProduct,quantity) 
         VALUES ( ?, ?, ?, ?, ?,?)`,
      [idProduct, idShopCart, nameProduct, price, urlImg, 1],
    );
    console.log('result insertProductShopCart', result);
    console.log('insertProductShopCart ok');
  } catch (error) {
    console.error('insertProductShopCart error', error);
  }
};

export const searchProductShopCart = async (idShopCart, idProduct) => {
  try {
    const db = await getDBConnection();
    const result = await db.executeSql(
      `SELECT * FROM productshopcart WHERE idShop = ? AND idProduct = ?`,
      [idShopCart, idProduct],
    );
    console.log('searchProductShopCart ok');
    return GetValues(result);
  } catch (error) {
    console.error('searchProductShopCart error', error);
    return [];
  }
};

export const updateProductShopCart_Quantity = async (idShopCart, idProduct) => {
  try {
    const db = await getDBConnection();

    await db.executeSql(
      `UPDATE productshopcart
       SET quantity = quantity + 1
       WHERE idShop = ? 
        AND idProduct = ?`,
      [idShopCart, idProduct],
    );
    console.log('updateProductShopCart_Quantity ok');
  } catch (error) {
    console.error('updateProductShopCart_Quantity error', error);
  }
};

export const GetProductsShopCart_Quantity = async (idShopCart, idProduct) => {
  try {
    const db = await getDBConnection();
    const result = await db.executeSql(
      `SELECT quantity FROM productshopcart  WHERE idShop = ?
      AND idProduct = ?`,
      [idShopCart, idProduct],
    );
    console.log('GetProductsShopCart_Quantity ok');
    return GetValues(result);
  } catch (error) {
    console.error('GetProductsShopCart_Quantity error', error);
    return [];
  }
};

export const updateProductShopCart_Quantity_Minus = async (
  idShopCart,
  idProduct,
) => {
  try {
    const db = await getDBConnection();

    await db.executeSql(
      `UPDATE productshopcart
        SET quantity = quantity - 1
        WHERE idShop = ?
        AND idProduct = ?`,
      [idShopCart, idProduct],
    );
  } catch (error) {
    console.error('updateProductShopCart_Quantity_Minus error', error);
  }
};

export const GetAllProductShopCart = async () => {
  try {
    const db = await getDBConnection();
    const result = await db.executeSql(`SELECT * FROM productshopcart`);
    console.log('GetAllProductShopCart ok');
    return GetValues(result);
  } catch (error) {
    console.error('GetAllProductShopCart error', error);
    return [];
  }
};

export const GetAllProductWithShop = async () => {
  try {
    const db = await getDBConnection();
    const result = await db.executeSql(`
      SELECT SHOP.idShop, SHOP.nameSHop, idProduct as id, nameProduct as name, urlImgProduct as urlImg,price, quantity as total
      FROM SHOPCART SHOP
        INNER JOIN productshopcart PROD ON SHOP.idShop = PROD.idShop`);
    console.log('GetAllProductWithShop ok');
    return GetValues(result);
  } catch (error) {
    console.error('GetAllProductWithShop error', error);
  }
};

export const deleteTableProductShopCart = async () => {
  try {
    const db = await getDBConnection();
    await db.executeSql(`DELETE FROM productshopcart`);
    console.log('deleteTableProductShopCart ok');
  } catch (error) {
    console.error('deleteTableShopCart error', error);
  }
};

export const deleteProductShopCart = async (idShopCart, idProduct) => {
  try {
    const db = await getDBConnection();
    await db.executeSql(
      `DELETE FROM productshopcart WHERE idShop = ? AND idProduct = ?`,
      [idShopCart, idProduct],
    );
    console.log('deleteProductShopCart ok');
  } catch (error) {
    console.error('deleteProductShopCart error', error);
  }
};

export const GetAllProductWithShopCondition = async idShop => {
  try {
    const db = await getDBConnection();
    const result = await db.executeSql(`
    SELECT SHOP.idShop, SHOP.nameSHop, idProduct as id, nameProduct as name, urlImgProduct as urlImg,price, quantity as total
    FROM SHOPCART SHOP
      INNER JOIN productshopcart PROD ON SHOP.idShop = PROD.idShop
    WHERE SHOP.idShop = ${idShop}`);
    console.log('GetAllProductWithShop ok');
    return GetValues(result);
  } catch (error) {
    console.error('GetAllProductWithShop error', error);
  }
};
