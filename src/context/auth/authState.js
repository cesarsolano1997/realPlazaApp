import React, {useReducer} from 'react';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import auth from '@react-native-firebase/auth';
import {ToastAndroid, AlertIOS, Platform} from 'react-native';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

import {
  REGISTER_USER,
  SET_USER,
  SET_LOCAL_INITIAL,
  LOGOUT_USER,
} from '../types';

import {
  getDataUser,
  insertDataUser,
  deleteTableUser,
  updateDataUserLocalInitial,
} from '../../db/table-User';

import {deleteTableShopCart} from '../../db/table-ShopCart';

import {deleteTableProductShopCart} from '../../db/table-productshopcart.js';

const AuthState = props => {
  const initialState = {
    user: null,
    localInitial: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setUser = async user => {
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };

  const login = async (email, password) => {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      // setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (email, password) => {
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);

      dispatch({
        type: REGISTER_USER,
        payload: user,
      });
    } catch (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('No se pudo iniciar sesión', ToastAndroid.SHORT);
      } else {
        AlertIOS.alert('No se pudo iniciar sesión');
      }
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      dispatch({
        type: LOGOUT_USER,
      });

      // sqllite
      await deleteTableUser();
      await deleteTableProductShopCart();
      await deleteTableShopCart();

      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Se cerró la sesión correctamente',
          ToastAndroid.SHORT,
        );
      } else {
        AlertIOS.alert('Se cerró la sesión correctamente');
      }
    } catch (error) {
      console.error('logout', error);
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'No se pudo iniciar sesión con facebook',
          ToastAndroid.SHORT,
        );
      } else {
        AlertIOS.alert('No se pudo iniciar sesión con facebook');
      }
    }
  };

  async function loginWithGoogle() {
    try {
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const resp = await auth()
        .signInWithCredential(googleCredential)
        .catch(error => console.log(error));

      console.log('loginWithGoogle', resp);

      if (resp.user) {
        const request_token = await fetch(
          'http://192.168.1.100/ApiRealPlaza/api/token/generate',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Name: resp.user.displayName,
              Email: resp.email,
            }),
          },
        );

        const token = await request_token.json();

        const userData = {
          name: resp.user.displayName,
          email: resp.user.email ? resp.user.email : '',
          imgProfile: resp.user.photoURL,
          token: token.Data,
        };

        console.log(token.Data);
        const inserted = await insertDataUser(userData);
        if (inserted) {
          dispatch({
            type: REGISTER_USER,
            payload: userData,
          });
        }

        if (Platform.OS === 'android') {
          ToastAndroid.show('Inicio de sesión exitosa', ToastAndroid.SHORT);
        } else {
          AlertIOS.alert('Inicio de sesión exitosa');
        }
      }
    } catch (error) {
      console.error('loginWithGoogle', error);
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'No se pudo iniciar sesión con google',
          ToastAndroid.SHORT,
        );
      } else {
        AlertIOS.alert('No se pudo iniciar sesión con google');
      }
    }
  }

  async function loginWithFacebook() {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'Usuario canceló el proceso';
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Algo salió mal al obtener el token de acceso';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      const resp = await auth().signInWithCredential(facebookCredential);

      if (resp.additionalUserInfo.profile.first_name) {
        const request_token = await fetch(
          'http://192.168.1.100/ApiRealPlaza/api/token/generate',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Name: resp.user.displayName,
              Email: resp.additionalUserInfo.profile.email,
            }),
          },
        );

        const token = await request_token.json();

        console.log('AuthFacebook=>TOKEN', token);

        const userData = {
          name: resp.user.displayName,
          email: resp.additionalUserInfo.profile.email
            ? resp.additionalUserInfo.profile.email
            : '',
          imgProfile: resp.user.providerData[0].photoURL,
          token: token.Data,
        };

        const inserted = await insertDataUser(userData);
        if (inserted) {
          console.log('InsertdataUser');
          dispatch({
            type: REGISTER_USER,
            payload: userData,
          });
        }
      }
    } catch (error) {
      console.error('loginWithFacebook', error);
      if (Platform.OS === 'android') {
        ToastAndroid.show(error.substring(0, 20), ToastAndroid.SHORT);
      } else {
        AlertIOS.alert('No se pudo iniciar sesión con facebook');
      }
    }
  }

  const getLocalInitial = async () => {
    try {
      const resp = await getDataUser();
      console.log('getLocalInitial', resp);
      console.log('getLocalInitial', resp.length);
      if (resp.length > 0) {
        const localInitial = resp[0];
        const {keyLocalInitial: key, localInitial: name} = localInitial;
        dispatch({
          type: SET_LOCAL_INITIAL,
          payload: {key, name},
        });
      }
    } catch (error) {
      console.error('getLocalInitial', error);
    }
  };

  const setLocalInitial = async (key, name) => {
    dispatch({
      type: SET_LOCAL_INITIAL,
      payload: {key, name},
    });

    updateDataUserLocalInitial(name, key);
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        setUser,
        login,
        register,
        logout,
        loginWithGoogle,
        loginWithFacebook,
        localInitial: state.localInitial,
        setLocalInitial,
        getLocalInitial,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
