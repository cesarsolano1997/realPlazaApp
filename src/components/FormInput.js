import React from 'react';
import {View, TextInput} from 'react-native';

const FormInput = ({type, placeHolder}) => {
  return (
    <View>
      <TextInput type={type} placeholder={placeHolder} />
    </View>
  );
};

export default FormInput;
