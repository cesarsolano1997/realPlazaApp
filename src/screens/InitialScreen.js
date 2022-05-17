import React, {useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import AuthContext from '../context/auth/authContext';

const InitialScreen = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const {user} = authContext;

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigation.navigate('DrawerNavigator', {screen: 'Tiendas'});
      }, 1000);
    } else {
      setTimeout(() => {
        navigation.navigate('LoginScreen');
      }, 1000);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        onPress={() => navigation.navigate('LoginScreen')}>
        Real{' '}
        <Image style={styles.img} source={require('../assets/logo.webp')} />{' '}
        Plaza
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7300E0',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 40,
    height: 150,
    color: '#fff',
  },
  img: {
    width: 90,
    height: 90,
  },
});

export default InitialScreen;
