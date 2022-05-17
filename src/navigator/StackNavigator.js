import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';

import AuthContext from '../context/auth/authContext';
import ShopCartContext from '../context/shopCart/ShopCartContext';

import LoginScreen from '../screens/LoginScreen';
import InitialScreen from '../screens/InitialScreen';
import DrawerNavigator from './DrawerNavigator';

import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

import {createTableUser} from '../db/table-User';
import {createTableShopCart} from '../db/table-ShopCart';
import {createTableProductShopCart} from '../db/table-productshopcart';

const StackNavigator = () => {
  const authContext = useContext(AuthContext);
  const {user, setUser, getLocalInitial, localInitial} = authContext;

  const shopCartContext = useContext(ShopCartContext);
  const {syncStore} = shopCartContext;

  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = async user => {
    if (user) {
      console.log('localInitial', localInitial);
      const datUser = {
        name: user.displayName,
        email: user.email,
        imgProfile: user.photoURL,
      };
      setUser(datUser);
      getLocalInitial();
    }

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const createAllTables = async () => {
      const userIsCreated = await createTableUser();
      if (userIsCreated) {
        const shopCartIsCreated = await createTableShopCart();
        if (shopCartIsCreated) {
          const productShopCartIsCreated = await createTableProductShopCart();
          if (productShopCartIsCreated) {
            syncStore();
          }
        }
      }
    };
    createAllTables();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <>
      <StatusBar animated={true} backgroundColor="#7300E0" />
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="InitialScreen"
              component={InitialScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="InitialScreen"
              component={InitialScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
