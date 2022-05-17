import React, {useContext, useEffect} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import Header from '../components/Header';

import ShopsStackNavigator from '../navigator/ShopsStackNavigator';
import CustomDrawerContent from '../components/CustomDrawer';

import AuthContext from '../context/auth/authContext';
import ScreenOptionsContext from '../context/screenOptions/ScreenOptionsContext';

import MallState from '../context/malls/MallState';
import ShopsState from '../context/shops/ShopsState';

import ShopCartScreen from '../screens/ShopCartScreen';
import MallScreen from '../screens/MallScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const authContext = useContext(AuthContext);

  const {localInitial, logout} = authContext;

  const screenOptionsContext = useContext(ScreenOptionsContext);

  const {showHeaderDrawer} = screenOptionsContext;

  return (
    <MallState>
      <ShopsState>
        <Drawer.Navigator
          drawerContent={props => (
            <CustomDrawerContent {...props} logout={logout} />
          )}
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#fff',
          }}
          initialRouteName={localInitial && 'Tiendas'}>
          {localInitial === null ? (
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerStyle: {backgroundColor: '#7300E0'},
                headerTitle: () => (
                  <Header
                    title="Centros comerciales"
                    backgroundColor={'#7300E0'}
                    color={'#fff'}
                  />
                ),
              }}
            />
          ) : (
            <>
              <Drawer.Screen
                name="Tiendas"
                component={ShopsStackNavigator}
                options={{
                  headerStyle: {backgroundColor: '#7300E0'},
                  headerTitle: () => (
                    <Header backgroundColor={'#7300E0'} color={'#fff'} />
                  ),
                  headerShown: showHeaderDrawer,
                }}
              />
              <Drawer.Screen
                name="Carrito de Compras"
                component={ShopCartScreen}
                options={{
                  headerStyle: {backgroundColor: '#7300E0'},
                  headerTitle: () => (
                    <Header
                      title="Carrito de compras"
                      backgroundColor={'#7300E0'}
                      color={'#fff'}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="Locales comerciales"
                component={MallScreen}
                options={{
                  headerStyle: {backgroundColor: '#7300E0'},
                  headerTitle: () => (
                    <Header
                      title="Centros comerciales"
                      backgroundColor={'#7300E0'}
                      color={'#fff'}
                    />
                  ),
                }}
              />
            </>
          )}
        </Drawer.Navigator>
      </ShopsState>
    </MallState>
  );
};

export default DrawerNavigator;
