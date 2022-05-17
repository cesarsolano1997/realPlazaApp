import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Logo from '../components/Logo';
import SocialButton from '../components/SocialButton';
import AuthContext from '../context/auth/authContext';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  const authContext = useContext(AuthContext);

  const {register, loginWithGoogle, loginWithFacebook} = authContext;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '748223774597-lha0n5pkgmfoeq85ic64ddefm4m52et8.apps.googleusercontent.com',
    });
  }, []);

  const loginWithEmail = async () => {
    try {
      await register('cesarsolano@gmail.com', '12314hwehkjqwehkj');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Logo backgroundColor={'#fff'} color={'#7300E0'} />
      <Text style={styles.title}>Bienvenido</Text>
      <SocialButton
        buttonTitle="Iniciar sesión con Google"
        icon="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => loginWithGoogle()}
      />

      <SocialButton
        buttonTitle="Iniciar sesión con Facebook"
        icon="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => loginWithFacebook()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    color: '#7300E0',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 30,
  },
});

export default LoginScreen;
