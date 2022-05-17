import {enablePromise} from 'react-native-sqlite-storage';

import {getDBConnection, GetValues} from './db-service';

enablePromise(true);

export const createTableShopCart = async () => {
  try {
    const db = await getDBConnection();
    await db.executeSql(`CREATE TABLE IF NOT EXISTS shopcart (
            idShopCart INTEGER PRIMARY KEY AUTOINCREMENT,
            idShop data_type INTEGER NOT NULL,
            nameShop  data_type TEXT NOT NULL   
        )`);
    console.log('createTableShopCart ok');

    return true;
  } catch (error) {
    console.log('createTableShopCart error', error);
    return false;
  }
};

export const deleteTableShopCart = async () => {
  try {
    const db = await getDBConnection();
    await db.executeSql('DELETE FROM shopcart');
    console.log('deleteTableShopCart ok');
  } catch (error) {
    console.log('deleteTableShopCart error', error);
  }
};

export const searchShop = async idShop => {
  try {
    const db = await getDBConnection();
    const result = await db.executeSql(
      `SELECT * FROM shopcart WHERE idShop = ?`,
      [idShop],
    );
    return GetValues(result);
  } catch (error) {
    console.log('searchShop error', error);
    return [];
  }
};

export const insertShopCart = async (idShop, nameShop) => {
  try {
    const db = await getDBConnection();
    const result = await db.executeSql(
      `INSERT INTO shopcart (idShop, nameShop) VALUES ( ?, ?)`,
      [idShop, nameShop],
    );
    console.log('insertShopCart ok');

    return true;
  } catch (error) {
    console.log('insertShopCart error', error);
    return false;
  }
};

export const getShopCart = async () => {
  try {
    const db = await getDBConnection();
    const {rows} = await db.executeSql(`SELECT * FROM shopcart`);
    console.log('getShopCart ok');
    return rows;
  } catch (error) {
    console.log('getShopCart error', error);
  }
};

export const deleteShopCart = async idShop => {
  try {
    const db = await getDBConnection();
    await db.executeSql(`DELETE FROM shopcart WHERE idShop = ?`, [idShop]);
    console.log('deleteShopCart ok');
    return true;
  } catch (error) {
    console.log('deleteShopCart error', error);
    return false;
  }
};
