import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';

import ShopCartContext from '../context/shopCart/ShopCartContext';

const CardDetail = ({item, totalIsPar, lastItem}) => {
  const {name, price, urlImg} = item;

  const shopCartContext = useContext(ShopCartContext);

  const {addProduct} = shopCartContext;

  const positionCard =
    lastItem && !totalIsPar ? true : lastItem && totalIsPar ? false : false;

  useEffect(() => {
    // navigation.dispatch(DrawerActions.toggleDrawer());
  }, []);

  return (
    <View
      style={{
        width: positionCard ? '100%' : '50%',
        height: positionCard ? 370 : 'auto',
        flexDirection: 'row',
      }}>
      <View style={styles.container}>
        <Image
          source={{uri: urlImg}}
          style={styles.image}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productPrice}>S/.{price}</Text>
        </View>
        <View style={styles.containerAddProduct}>
          <Button
            onPress={() => addProduct(item)}
            title="Agregar"
            color="#841584"
            style={styles.addProduct}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 5,
    height: 250,
    width: '50%',
  },
  image: {
    width: 'auto',
    height: 80,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  containerAddProduct: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  addProduct: {
    alignSelf: 'stretch',
    fontSize: 50,
    fontWeight: 'normal',
  },
});

export default CardDetail;
