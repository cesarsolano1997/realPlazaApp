import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import ShopsContext from '../context/shops/ShopsContext';

const CardShop = ({item, navigation}) => {
  const {id, name, address, bussinesHours, urlImg} = item;

  const image = {uri: urlImg};

  const shopsContext = useContext(ShopsContext);

  const {getShopDetail} = shopsContext;

  const handleGetShopDetail = id => {
    getShopDetail(id);
    navigation.navigate('ShopDetail', {idMall: id, nameShop: name});
  };

  return (
    <TouchableOpacity onPress={() => handleGetShopDetail(id)}>
      <View style={styles.card}>
        <ImageBackground
          source={image}
          resizeMode="stretch"
          style={styles.backgroundImage}
          imageStyle={{borderRadius: 10}}>
          <View style={styles.cardContent}>
            <Text>
              <View
                style={{
                  backgroundColor: '#ccc',
                }}>
                <Text style={styles.name}> {name} </Text>
              </View>
            </Text>
            <Text style={styles.address}>{address}</Text>
            <Text style={styles.bussinesHours}>{bussinesHours}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    height: 130,
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    opacity: 0.8,
    backgroundColor: 'black',
    borderRadius: 10,
    width: null,
    height: null,
  },
  cardContent: {
    padding: 10,
    flex: 1,
    backgroundColor: 'transparent',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    width: 'auto',
    marginBottom: 0,
  },
  address: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  bussinesHours: {
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CardShop;
