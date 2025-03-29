/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, SafeAreaView, Alert} from 'react-native';
import Botao from '../../components/botao';
import {CommonActions} from '@react-navigation/native';
// import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {useTheme} from '@rneui/themed';
import { Colors } from '../../assets/colors';

export default ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const {signIn} = useContext(AuthUserContext);
  const {theme} = useTheme();

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


  const entrar = async () => {
    let msgError = '';
    if (email && password) {
      // setLoading(true);
      msgError = await signIn(email, password);
      if (msgError === 'ok') {
        // setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
      } else {
        // setLoading(false);
        Alert.alert('Ops!', msgError);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divCadastro}>
          <Text style={styles.criarConta}  onPress={() => navigation.navigate('SignUp')}>criar conta</Text>
        </View>
        <View style={styles.divForm}>
        <View style={styles.linha} />
          <Image
            style={styles.image}
            source={require('../../assets/images/pato.jpg')}
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
            onChangeText={t=>setPassword(t)}
            cursorColor={Colors.darkGrey}
            placeholderTextColor={Colors.roxo}
            onEndEditing={()=>entrar()}
          />
          <Text
            style={styles.esqueceuSenha}
            onPress={() => navigation.navigate('ForgotPassWord')}>
              Esqueceu sua senha?</Text>
          <Botao texto="ENTRAR" onClick={entrar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
