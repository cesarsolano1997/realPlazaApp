import React, {useContext, useEffect} from 'react';
import CardMall from '../components/CardMall';
import SKCardMall from '../skeleton/SKCardMall';

import {View, Text, StyleSheet} from 'react-native';

import MallContext from '../context/malls/MallContext';

const MallScreen = ({navigation}) => {
  const mallContext = useContext(MallContext);

  const {malls, ListMalls} = mallContext;

  useEffect(() => {
    ListMalls();
  }, []);

  return malls ? (
    <View style={styles.container}>
      <Text style={styles.title}>
        Puede elegir entre nuestros tantos locales comerciales
      </Text>
      <Text>
        <CardMall data={malls} navigation={navigation} />
      </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>
        Puede elegir entre nuestros tantos locales comerciales
      </Text>
      <View style={styles.scrollSkeleton}>
        <SKCardMall />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  scrollSkeleton: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 25,
  },
});

export default MallScreen;
