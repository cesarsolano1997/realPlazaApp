import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CardMall from '../components/CardMall';
import SKCardMall from '../skeleton/SKCardMall';

import AuthContext from '../context/auth/authContext';
import MallContext from '../context/malls/MallContext';

import {windowWidth, windowHeight} from '../utils/Dimentions';

const HomeScreen = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const {localInitial, user} = authContext;

  const mallContext = useContext(MallContext);

  const {malls, ListMalls} = mallContext;

  useEffect(() => {
    ListMalls();
  }, []);

  useEffect(() => {
    if (localInitial) {
      navigation.navigate('Tiendas');
    }
  }, []);

  useEffect(() => {
    if (localInitial) {
      navigation.navigate('Tiendas');
    }
  }, [localInitial]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textWelcome}>¡Bienvenido {user.name}!</Text>
        <Text style={styles.textSecondary}>
          Por favor escoja uno de nuestros centros comerciales disponibles
        </Text>
        {malls ? <CardMall data={malls} /> : <SKCardMall />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginHorizontal: 20,
    marginTop: 30,
  },
  textWelcome: {
    color: '#7300E0',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  textSecondary: {
    fontSize: 20,
    textAlign: 'center',
  },
  containerItem: {
    flexGrow: 1,
    flex: 1,
    width: windowWidth - 40,
    top: 180,
    height: windowHeight - 300,
    position: 'absolute',
    zIndex: 1,
    paddingVertical: 20,
  },
  textItem: {
    fontSize: 33,
    textAlign: 'center',
    zIndex: 0,
  },
  buttonItem: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginBottom: 5,
    padding: 5,
  },
});

export default HomeScreen;
