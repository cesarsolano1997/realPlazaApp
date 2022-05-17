import React, {useContext, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import ShopCartContext from '../context/shopCart/ShopCartContext';

const ShopCart = ({navigation}) => {
  const isFocused = useIsFocused();
  const shopCartContext = useContext(ShopCartContext);

  const {totalProducts, calculateTotal} = shopCartContext;

  const showScreenShopCart = () => {
    navigation.navigate('Carrito de Compras');
  };

  useEffect(() => {
    calculateTotal();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonCart} onPress={showScreenShopCart}>
        <Image
          source={{uri: 'https://i.ibb.co/dK6HjMB/shopCart.png'}}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity onPress={showScreenShopCart}>
          <Text style={styles.buttonText}>
            Ver canasta{' '}
            <View style={{borderRadius: 150 / 2}}>
              <Text style={styles.totalProducts}>
                {totalProducts !== 0 && `  ${totalProducts}  `}
              </Text>
            </View>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    marginTop: 10,
    borderStartColor: '#000',
    borderTopColor: 1,
    borderStyle: 'solid',
  },
  buttonCart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7300E0',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  totalProducts: {
    backgroundColor: '#fff',
    color: '#7300E0',
    borderRadius: 150 / 2,
    fontSize: 20,
  },
});

export default ShopCart;
