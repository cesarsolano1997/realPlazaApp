import React from 'react';
import {TextInput, View, Image, StyleSheet} from 'react-native';

const SearchInput = ({onChangeText, stylesContainer}) => {
  return (
    <View style={[styles.container, stylesContainer]}>
      <TextInput
        style={styles.textInput}
        placeholder="Buscar tiendas"
        placeholderTextColor={'#4D4D4D'}
        onChangeText={onChangeText}
      />
      <Image
        source={{
          uri: 'https://i.ibb.co/njTVq3d/search.png',
        }}
        style={styles.imageSearch}
        resizeMode="stretch"
      />
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
    margin: 10,
    borderRadius: 10,
  },
  textInput: {
    color: 'black',
    fontSize: 20,
    flex: 1,
  },
  imageSearch: {
    width: 25,
    height: 25,
  },
});

export default SearchInput;
