import React, {useContext} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Button} from 'react-native';

import ShopCartContext from '../context/shopCart/ShopCartContext';

const CardGroupShopCart = ({shop}) => {
  const shopCartContext = useContext(ShopCartContext);

  const {removeProduct, addProduct} = shopCartContext;

  const handleAddProduct = item => {
    item.idShop = shop.idShop;
    item.nameShop = shop.nameShop;

    addProduct(item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleShop}>Tienda {shop.nameShop}</Text>
      <Text style={styles.subTitleShop}>Detalle</Text>
      <FlatList
        data={shop.products}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.containerDetail}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{uri: item.urlImg}}
              />
              <View style={styles.detailProduct}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>$ {item.price}</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Button
                  title="-"
                  style={styles.button}
                  onPress={() => removeProduct(item, shop.idShop)}
                />
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {item.total}
                </Text>
                <Button
                  title="+"
                  style={styles.button}
                  onPress={() => handleAddProduct(item)}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  titleShop: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 18,
  },
  containerDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
  subTitleShop: {},
  button: {
    margin: 10,
  },
  detailProduct: {
    flex: 1,
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default CardGroupShopCart;
