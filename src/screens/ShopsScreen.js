import React, {useContext, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, FlatList, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import CardShop from '../components/CardShop';
import OrderInput from '../components/OrderInput';
import SearchInput from '../components/SearchInput';
import SKCardShop from '../skeleton/SKCardShop';

import AuthContext from '../context/auth/authContext';
import ShopsContext from '../context/shops/ShopsContext';

import {windowHeight, windowWidth} from '../utils/Dimentions';

const ShopsScreen = ({navigation}) => {
  const [shopsLocal, setShopLocal] = useState(null);
  const isFocused = useIsFocused();

  const authContext = useContext(AuthContext);
  const shopsContext = useContext(ShopsContext);

  const {shops, getShops} = shopsContext;
  const {localInitial} = authContext;

  useEffect(() => {
    if (localInitial) {
      setTimeout(() => {
        getShops(localInitial.key);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (isFocused && shops === null) {
      setShopLocal(null);
    }
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => {
      setShopLocal(shops);
    }, 1000);
  }, [shops]);

  useEffect(() => {
    setTimeout(() => {
      getShops(localInitial.key);
    }, 2000);
  }, [localInitial]);

  useEffect(() => {
    console.log('Escuchando cambios de shopsLocal');
  }, [shopsLocal]);

  const onChangeText = text => {
    const searchShops = shops.filter(shop => {
      return shop.name.toLowerCase().includes(text.toLowerCase());
    });

    setShopLocal(searchShops);
  };

  const orderShops = order => {
    let orderState = [];
    if (order) {
      orderState = shopsLocal.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      orderState = shopsLocal.sort((a, b) => b.name.localeCompare(a.name));
    }
    console.log('ordenando', orderState);

    setShopLocal(orderState);
  };

  return (
    <View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <SearchInput
          onChangeText={onChangeText}
          stylesContainer={styles.widthSearch}
        />
        <OrderInput handleOrderShops={orderShops} />
      </View>
      {shopsLocal ? (
        <FlatList
          data={shopsLocal}
          style={{height: windowHeight - 150, flexGrow: 0}}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <CardShop item={item} navigation={navigation} />;
          }}
        />
      ) : (
        <SKCardShop />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  widthSearch: {
    width: windowWidth - 100,
  },
});

export default ShopsScreen;
