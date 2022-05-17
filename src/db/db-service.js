import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'realPlaza.db', location: 'default'});
};

export const GetValues = result => {
  const data = [];
  if (result[0].rows.length > 0) {
    for (let i = 0; i < result[0].rows.length; i++) {
      const row = result[0].rows.item(i);
      data.push(row);
    }
  }
  return data;
};
