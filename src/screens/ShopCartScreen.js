import React, {useContext, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet, Pressable, Image} from 'react-native';
import CardGroupShopCart from '../components/CardGroupShopCart';

import {useIsFocused} from '@react-navigation/native';
import ShopCartContext from '../context/shopCart/ShopCartContext';

import {windowHeight} from '../utils/Dimentions';
import {SafeAreaView} from 'react-native-safe-area-context';

const ShopCartScreen = ({navigation}) => {
  const ifFocused = useIsFocused();
  const shopCartContext = useContext(ShopCartContext);

  const {cart, priceTotal, calculateTotal, syncStore} = shopCartContext;

  useEffect(() => {
    syncStore();
    calculateTotal();
  }, [ifFocused]);

  return (
    <View>
      {cart.length === 0 ? (
        <View style={styles.containerNothing}>
          <Image
            source={{
              uri: 'https://i.ibb.co/dK6HjMB/shopCart.png',
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.textTitleNothing}>Tu carrito</Text>
          <Text style={styles.textSubTitleNothing}>
            Tu carrito de compras está vacío
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Tiendas')}>
            <Text style={styles.buttonText}>{`Continua comprando`} </Text>
          </Pressable>
        </View>
      ) : (
        <>
          <SafeAreaView>
            <FlatList
              data={cart}
              style={styles.listGroupShopCart}
              keyExtractor={(_, index) => index}
              renderItem={({item}) => {
                return <CardGroupShopCart shop={item} />;
              }}
            />
          </SafeAreaView>
          <Text style={styles.textPrice}>Total: S/. {priceTotal}</Text>
          <Pressable
            style={styles.buttonPay}
            onPress={() => alert('Función en desarrollo')}>
            <Text style={styles.textButtonPay}>Ir a pagar</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerNothing: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight - 200,
  },
  textTitleNothing: {
    fontSize: 35,
    textAlign: 'center',
    color: '#5c5c5c',
    marginBottom: 5,
  },
  textSubTitleNothing: {
    fontSize: 25,
    textAlign: 'center',
    color: '#7A7A7A',
    marginBottom: 15,
  },
  listGroupShopCart: {
    flexGrow: 0,
    height: windowHeight - 200,
  },
  button: {
    padding: 10,
    backgroundColor: '#7300E0',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  textPrice: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  buttonPay: {
    backgroundColor: '#fff',
    borderColor: '#7300E0',
    borderWidth: 1,
    borderStyle: 'solid',
    marginHorizontal: 10,
    marginVertical: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  textButtonPay: {
    color: '#7300E0',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default ShopCartScreen;
