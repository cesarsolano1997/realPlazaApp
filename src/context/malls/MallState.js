import React, {useReducer} from 'react';
import {ToastAndroid, AlertIOS, Platform} from 'react-native';

import MallContext from './MallContext';
import MallReducer from './MallReducer';

import {GET_MALLS} from '../types';

import {fetchWrapper} from '../../utils/fetchWrapper';

const MallState = props => {
  const initialState = {
    malls: null,
  };

  const [state, dispatch] = useReducer(MallReducer, initialState);

  const ListMalls = async () => {
    try {
      const resp = await fetchWrapper.get('mall/listMall');

      const malls = resp;

      console.log('malls', malls);

      if (malls.Data) {
        setTimeout(() => {
          dispatch({
            type: GET_MALLS,
            payload: malls.Data,
          });
        }, 2000);
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'No se pudo obtener lista de centros comerciales',
            ToastAndroid.SHORT,
          );
        } else {
          AlertIOS.alert('No se pudo obtener lista de centros comerciales');
        }
      }
    } catch (error) {
      console.error('ListMalls', error);
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Ocurrió un error al obtener la lista de centros comerciales',
          ToastAndroid.SHORT,
        );
      } else {
        AlertIOS.alert(
          'Ocurrió un error al obtener la lista de centros comerciales',
        );
      }
    }
  };

  return (
    <MallContext.Provider
      value={{
        malls: state.malls,
        ListMalls,
      }}>
      {props.children}
    </MallContext.Provider>
  );
};

export default MallState;
