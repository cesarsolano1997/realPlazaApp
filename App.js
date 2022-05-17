import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigator/StackNavigator';
import AuthState from './src/context/auth/authState';
import ShopCartState from './src/context/shopCart/ShopCartState';
import ScreenOptionsState from './src/context/screenOptions/ScreenOptionsState';

import Animated, {useSharedValue} from 'react-native-reanimated';

const App = () => {
  const animation = useSharedValue({width: 0, height: 0});

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        // onPress={() => navigation.navigate('LoginScreen')}>
      >
        Real{' '}
        <Animated.Image
          style={styles.img}
          source={require('./src/assets/logo.webp')}
        />{' '}
        Plaza
      </Text>
    </View>
    // <NavigationContainer>
    //   <AuthState>
    //     <ScreenOptionsState>
    //       <ShopCartState>
    //         <StackNavigator />
    //       </ShopCartState>
    //     </ScreenOptionsState>
    //   </AuthState>
    // </NavigationContainer>
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
    fontSize: 45,
    height: 150,
    color: '#fff',
  },
  img: {
    width: 0,
    height: 0,
  },
});
export default App;
