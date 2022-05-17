import React, {useContext} from 'react';

import {StyleSheet, View, Image, Text} from 'react-native';

import {
  DrawerContentScrollView,
  // DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AuthContext from '../context/auth/authContext';
import {windowHeight} from '../utils/Dimentions';

const CustomDrawerContent = props => {
  const authContext = useContext(AuthContext);

  const {user, localInitial, logout} = authContext;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInformation}>
          <View>
            <Image
              source={{uri: `${user.imgProfile}?height=300`}}
              style={styles.imgProfile}
            />
          </View>
          <View>
            <Text style={styles.userName}>
              {user.name} {!user.localInitial}
            </Text>
          </View>
        </View>
        {localInitial && (
          <>
            <DrawerItem
              label="Centros comerciales"
              icon={() => (
                <Image
                  source={{
                    uri: 'https://i.ibb.co/02yX7pb/shopping-center.png',
                  }}
                  style={{width: 25, height: 25}}
                />
              )}
              onPress={() => props.navigation.navigate('Locales comerciales')}
              labelStyle={{color: '#4D4D4D', fontSize: 16}}
            />
            <DrawerItem
              label="Tiendas"
              icon={() => (
                <Image
                  source={{
                    uri: 'https://i.ibb.co/HdHt0BJ/shop.png',
                  }}
                  style={{width: 25, height: 25}}
                />
              )}
              onPress={() =>
                props.navigation.navigate('Tiendas', {screen: 'Tiendas'})
              }
              labelStyle={{color: '#4D4D4D', fontSize: 16}}
            />
            <DrawerItem
              label="Carrito de Compras"
              icon={() => (
                <Image
                  source={{
                    uri: 'https://i.ibb.co/8sBXJhY/shopping-cart.png',
                  }}
                  style={{width: 25, height: 25}}
                />
              )}
              onPress={() => props.navigation.navigate('Carrito de Compras')}
              labelStyle={{color: '#4D4D4D', fontSize: 16}}
            />
          </>
        )}
      </View>
      <DrawerItem
        icon={() => (
          <Image
            source={{
              uri: 'https://i.ibb.co/Htr1jrC/logout.png',
            }}
            style={{width: 25, height: 25}}
          />
        )}
        label="Cerrar Sesión"
        onPress={() => logout()}
        style={styles.bottomDrawerSection}
        labelStyle={{color: '#4D4D4D', fontSize: 16}}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    height: windowHeight - 60,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  userInformation: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
  },
  imgProfile: {
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
  },
});

export default CustomDrawerContent;
