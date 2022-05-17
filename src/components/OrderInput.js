import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  AlertIOS,
  Platform,
  ToastAndroid,
} from 'react-native';

const OrderInput = ({handleOrderShops}) => {
  const [order, setOrder] = useState(true);

  const orderInput = () => {
    setOrder(!order);
    handleOrderShops(order);

    if (Platform.OS === 'android') {
      ToastAndroid.show(
        order ? 'Ordenado ascendentemente' : 'Ordenado descendentemente',
        ToastAndroid.SHORT,
      );
    } else {
      AlertIOS.show(
        order ? 'Ordenado ascendentemente' : 'Ordenado descendentemente',
        AlertIOS.SHORT,
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={orderInput}>
        <Image
          source={{
            uri: order
              ? 'https://i.ibb.co/hZRYLK7/order-ascending.png'
              : 'https://i.ibb.co/5W3N7xg/order-descending.png',
          }}
          style={{width: 40, height: 40}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dedede',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 5,
    borderRadius: 10,
    flex: 1,
  },
  textOrder: {
    fontSize: 20,
  },
});

export default OrderInput;
