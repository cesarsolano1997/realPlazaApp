import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

import {windowWidth} from '../utils/Dimentions';

import AuthContext from '../context/auth/authContext';

const Logo = ({title, backgroundColor, color}) => {
  const authContext = useContext(AuthContext);

  const {localInitial} = authContext;

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Text style={[styles.title, {color: color}]}>
        {title === undefined
          ? localInitial
            ? localInitial.name
            : 'Real Plaza'
          : title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    width: windowWidth,
  },
  title: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 10,
    padding: 10,
    paddingBottom: 0,
  },
  img: {
    width: 40,
    height: 30,
  },
});

export default Logo;
