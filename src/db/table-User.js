import {enablePromise} from 'react-native-sqlite-storage';

import {getDBConnection, GetValues} from './db-service';

enablePromise(true);

export const createTableUser = async () => {
  try {
    const db = await getDBConnection();
    const query = `CREATE TABLE IF NOT EXISTS user (
      name data_type TEXT NOT NULL,
      email data_type TEXT NOT NULL,
      localInitial data_type TEXT NULL,
      keyLocalInitial data_type INTEGER NULL,
      imgProfile data_type TEXT NULL,
      token_user data_type TEXT NULL
      );`;

    await db.executeSql(query);
    console.log('createTableUser ok');
    return true;
  } catch (err) {
    console.error('createTableUser', err);
    return false;
  }
};

export const insertDataUser = async ({name, email, imgProfile, token}) => {
  try {
    const db = await getDBConnection();
    const query = `INSERT INTO user (name,email, imgProfile, token_user) VALUES (?,?,?,?)`;
    await db.executeSql(query, [name, email, imgProfile, token]);
    return true;
  } catch (error) {
    console.error('insertDataUser', error);
    return false;
  }
};

export const updateDataUserLocalInitial = async (
  localInitial,
  keyLocalInitial,
) => {
  try {
    const db = await getDBConnection();
    const query = `UPDATE user SET localInitial=? , keyLocalInitial=?`;
    await db.executeSql(query, [localInitial, keyLocalInitial]);
  } catch (error) {
    console.error('updateDataUserLocalInitial', error);
  }
};

export const getDataUser = async () => {
  try {
    const db = await getDBConnection();
    const query =
      ' SELECT name,email,localInitial,keyLocalInitial,imgProfile FROM user ';
    const result = await db.executeSql(query);

    return GetValues(result);
  } catch (error) {
    console.error('getDataUser', error);
  }
};

export const getTokenUser = async () => {
  try {
    const db = await getDBConnection();
    const query = ' SELECT token_user FROM user ';
    const result = await db.executeSql(query);

    return GetValues(result);
  } catch (error) {
    console.error('getTokenUser', error);
  }
};

export const deleteTableUser = async () => {
  try {
    const db = await getDBConnection();
    const query = 'DELETE FROM user';
    await db.executeSql(query);

    console.log('deleteTableUser ok');
  } catch (error) {
    console.error('deleteTableUser', error);
  }
};
