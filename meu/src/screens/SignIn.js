import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, SafeAreaView, Alert} from 'react-native';
import Botao from '../components/botao';
import { Colors } from '../assets/colors';
// import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

// import {useTheme, Input, Icon, Text, Image} from '@rneui/themed';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const recuperarSenha = () => {
    navigation.navigate('ForgotPassword');
  };

  const storeUserCache = async (value) => {
    try {
      value.pass = pass;
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
      navigation.dispatch(
        CommonActions.reset({
          index:0,
          routes: [{name: 'Home'}],
        })
      );
    } catch (e) {
      console.log('SignIn: erro em storeUserCache:', e);
    }
  };

  const getUser = ()=>{
    firestore().collection('users').doc(auth().currentUser.uid).get().then((doc) => {
        if (doc.exists) {
            storeUserCache(doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
        }
    }).catch((error) => {
        console.log('SignIn: erro em GetUser:', error);
    });
  };

  const entrar = () => {
    // alert('logar no sistema');
    if(email !== '' && pass !== ''){
      auth()
      .signInWithEmailAndPassword(email,pass)
      .then(()=>{
        if(!auth().currentUser.emailVerified){
          Alert.alert('Oopsie', 'Antes você precisa verificar seu email para prosseguir');
          return;
        }
        getUser();
      })
      .catch((e)=>{
        console.log('SignIn: erro em entrar: ' + e);
        switch(e.code){
          case 'auth/invalid-email':
            Alert.alert('Email mal formatado', 'Use a formatação correta');
            break;
          case 'auth/invalid-credential':
            Alert.alert('Erro', 'Email ou senha errados');
            break;
          case 'auth/too-many-requests':
            Alert.alert('Excesso de tentativas', 'Bloqueamos todas as tentativas de acesso vindas deste aparelho por excesso de tentativas e/ou atividade estranha, tente novamente mais tarde');
            break;
        }
      });
    } else{
      Alert.alert('Atenção', 'Algum campo está vazio');
    }
  };

  const cadastrarse = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divCadastro}>
          <Text style={styles.criarConta} onPress={cadastrarse}>criar conta</Text>
        </View>
        <View style={styles.divForm}>
        <View style={styles.linha} />
          <Image
            style={styles.image}
            source={require('../assets/images/pato.jpg')}
            accessibilityLabel="Imagem de um patinho com um caderno em um ambiente com folhas ao ar"
            />
          <TextInput
            style={styles.imput}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t=>setEmail(t)}
            onEndEditing={()=>this.passTextInput.focus()}
            placeholderTextColor={Colors.roxo}
          />
          <TextInput
            style={styles.imput}
            ref={(ref)=>{
              this.passTextInput = ref;
            }}
            secureTextEntry={true}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="send"
            onChangeText={t=>setPass(t)}
            cursorColor={Colors.darkGrey}
            placeholderTextColor={Colors.roxo}
            onEndEditing={()=>entrar()}
          />
          <Text
            style={styles.esqueceuSenha}
            onPress={recuperarSenha}>
              Esqueceu sua senha?</Text>
          <Botao texto="ENTRAR" onClick={entrar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  placeholder:{
    color: Colors.darkGrey,
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    color: Colors.roxo,
    backgroundColor: '#FAFAFA',
    fontFamily: 'Poppins',
  },
  divCadastro:{
    flex: 0,
    alignItems: 'left',
    marginTop: 5,
    marginBottom:20,
    // backgroundColor: '#0f0',

  },
  divForm:{
    flex: 8,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  image:{
    width:300,
    height:200,
    margin: 10,
  },
  imput:{
    width: '95%',
    height: 50,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    color: Colors.darkGrey,
  },
  esqueceuSenha:{
    fontSize: 15,
    color: Colors.roxo,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  linha:{
    flex: 0,
    alignItems: 'center',
    width: '100%',
    height: 1,
    borderBottomColor: Colors.roxo,
    borderBottomWidth: 1.5,
  },
  criarConta:{
    fontSize: 20,
    color: Colors.roxo,
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 5,
  },
});
