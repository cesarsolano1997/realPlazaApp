import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import {windowHeight} from '../utils/Dimentions';

const SocialButton = ({buttonTitle, icon, color, backgroundColor, ...rest}) => {
  let bgColor = backgroundColor;

  let iconSource =
    icon === 'facebook'
      ? require('../assets/facebook.webp')
      : require('../assets/google.webp');

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor: bgColor}]}
      {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={iconSource} style={styles.icon} />
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={[styles.buttonText, {color: color}]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 3,
  },
  iconWrapper: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 25,
    height: 30,
  },
});
