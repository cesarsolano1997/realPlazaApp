import React, {useContext} from 'react';

import {View, FlatList, StyleSheet, Text, Pressable, Alert} from 'react-native';

import AuthContext from '../context/auth/authContext';
import ShopsContext from '../context/shops/ShopsContext';

import {windowWidth, windowHeight} from '../utils/Dimentions';

import {deleteTableShopCart} from '../db/table-ShopCart';
import {deleteTableProductShopCart} from '../db/table-productshopcart';

const Item = ({item, navigation}) => {
  const {key, name} = item;

  const authContext = useContext(AuthContext);
  const shopsContext = useContext(ShopsContext);

  const {setLocalInitial, localInitial} = authContext;
  const {clearShops} = shopsContext;

  const onPress = () => {
    if (!localInitial) {
      setLocalInitial(key, name);

      if (navigation) {
        navigation.navigate('Tiendas', {screen: 'Tiendas'});
      }
    } else {
      Alert.alert(
        'Cambiar centro comercial',
        'Estimado cliente, si usted cambia de centro comercial se perderá todos los elementos del carrito de compras. ¿Desea cambiar de centro comercial?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Sí', onPress: () => deleteShopCart()},
        ],
      );
    }
  };

  const deleteShopCart = async () => {
    try {
      clearShops();
      await deleteTableShopCart();
      await deleteTableProductShopCart();

      console.log('deleteShopCart', 'ok');
      setLocalInitial(key, name);
      if (navigation) {
        navigation.navigate('Tiendas', {screen: 'Tiendas'});
      }
    } catch (error) {
      console.error('deleteShopCart', error);
    }
  };

  return (
    <View>
      <Pressable style={styles.buttonItem} onPress={() => onPress(key, name)}>
        <Text style={styles.textItem}>{name}</Text>
      </Pressable>
    </View>
  );
};

const CardMall = ({data, navigation}) => {
  const renderItem = ({item}) => <Item item={item} navigation={navigation} />;

  return (
    <View style={styles.containerItem}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    flexGrow: 1,
    flex: 1,
    width: windowWidth - 40,
    top: 200,
    height: windowHeight - 320,
    position: 'absolute',
    zIndex: 1,
    paddingVertical: 20,
  },
  buttonItem: {
    backgroundColor: '#7F16E0',
    borderRadius: 10,
    marginBottom: 5,
    padding: 5,
  },
  textItem: {
    fontSize: 33,
    textAlign: 'center',
    zIndex: 0,
    color: '#fff',
  },
});

export default CardMall;
