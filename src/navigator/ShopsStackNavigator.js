import React from 'react';

import ShopsScreen from '../screens/ShopsScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShopDetailScreen from '../screens/ShopDetailScreen';

const Stack = createNativeStackNavigator();

const ShopsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Shops"
        component={ShopsScreen}
        options={{headerShown: false}}
        // options={({route}) => ({
        //   navigationDrawer: route.params.navigationDrawer,
        // })}
      />
      <Stack.Screen
        name="ShopDetail"
        component={ShopDetailScreen}
        // options={{headerShown: false}}
        // options={({route}) => ({
        //   navigationDrawer: route.params.navigationDrawer,
        // })}
      />
    </Stack.Navigator>
  );
};

export default ShopsStackNavigator;
