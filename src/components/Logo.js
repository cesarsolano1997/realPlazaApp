import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

import {windowWidth} from '../utils/Dimentions';

const Logo = ({backgroundColor, color}) => {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Text
        style={[styles.title, {color: color}]}
        onPress={() => navigation.navigate('LoginScreen')}>
        Real{' '}
        <Image
          style={styles.img}
          source={{
            uri: 'https://i.ibb.co/GVcZfZd/logo-real-Plaza-dark-removebg-preview.png',
          }}
        />{' '}
        Plaza
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 90,
    width: windowWidth,
  },
  title: {
    fontSize: 39,
    color: '#fff',
    marginBottom: 10,
  },
  img: {
    width: 60,
    height: 50,
  },
});

export default Logo;
