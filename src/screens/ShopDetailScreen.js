import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  Animated,
  Alert,
} from 'react-native';
import CardDetail from '../components/CardDetail';

import ShopsContext from '../context/shops/ShopsContext';
import ShopCartContext from '../context/shopCart/ShopCartContext';
import ScreenOptionsContext from '../context/screenOptions/ScreenOptionsContext';

import ShopCart from '../components/ShopCart';
import {useIsFocused} from '@react-navigation/native';

import {fetchWrapper} from '../utils/fetchWrapper';

const HEADER_HEIGHT = 100;

const ShopDetailScreen = ({route, navigation}) => {
  const scrollY = new Animated.Value(0);
  const diffClam = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const translateY = diffClam.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  const isFocused = useIsFocused();
  const shopsContext = useContext(ShopsContext);
  const shopCartContext = useContext(ShopCartContext);
  const screenOptionsContext = useContext(ScreenOptionsContext);

  const [products, setProducts] = useState([]);

  const {shopDetail} = shopsContext;
  const {syncStore} = shopCartContext;
  const {ChangeShowHeaderDrawer} = screenOptionsContext;
  const {idMall, nameShop} = route.params;

  useEffect(() => {
    if (isFocused) {
      syncStore();
      ChangeShowHeaderDrawer(false);
    } else {
      ChangeShowHeaderDrawer(true);
    }
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      title: `Tienda ${nameShop}`,
    });

    try {
      const getProducts = async () => {
        const resp = await fetchWrapper.get(`/product/listProduct/${idMall}`);

        const products = resp;

        if (products.Data) {
          setProducts(products.Data);
        }
      };
      getProducts();
    } catch (error) {}

    return () => {
      ChangeShowHeaderDrawer(true);
    };
  }, []);

  return (
    <>
      {shopDetail ? (
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: HEADER_HEIGHT,
              zIndex: 100,
              elevation: 100,
              transform: [{translateY: translateY}],
            }}>
            <ImageBackground
              style={{
                width: 'auto',
                height: 'auto',
              }}
              size={'cover'}
              source={{uri: shopDetail.urlImg}}>
              <View style={styles.containerTitle}>
                <Image
                  resizeMode="contain"
                  imageStyle={{opacity: 1}}
                  style={styles.logoImage}
                  source={{
                    uri: shopDetail.urlLogo,
                  }}
                />
              </View>
            </ImageBackground>
          </Animated.View>
          <View style={{height: 600}}>
            <Animated.ScrollView
              scrollEnabled={true}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {useNativeDriver: true},
              )}
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: '#dedede',
                paddingBottom: 100,
              }}
              style={styles.containerBody}>
              {products.map((product, index) => (
                <CardDetail
                  key={product.id}
                  item={product}
                  totalIsPar={products.length % 2 === 0}
                  lastItem={products.length === index + 1}
                />
              ))}
            </Animated.ScrollView>
          </View>
          <View style={{marginHorizontal: 20, marginBottom: 10}}>
            <ShopCart navigation={navigation} />
          </View>
        </SafeAreaView>
      ) : (
        <View>
          <Text>No hay detalle</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    backgroundColor: '#fff',
  },
  shopName: {
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  containerBody: {
    paddingTop: HEADER_HEIGHT - 15,
    zIndex: 1,
    elevation: 1,
    flex: 1,
    padding: 20,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  containerProducts: {
    margin: 0,
    padding: 0,
    // height: 100,
    width: 'auto',
    backgroundColor: 'green',
  },
});

export default ShopDetailScreen;
