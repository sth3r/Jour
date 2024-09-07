import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, SafeAreaView } from 'react-native';
import Botao from '../components/botao';
import { Colors } from '../assets/colors';
import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// import {useTheme, Input, Icon, Text, Image} from '@rneui/themed';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  console.log(auth);

  const recuperarSenha = () => {
    alert('abrir modal recuperar senha');
  };
  const entrar = () => {
    console.log(`Email=${email} Senha=${pass}`);
    alert('logar no sistema');
  };
  const cadastrarse = () => {
    alert('cadastrar-se no sistema');
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
            placeholderTextColor={Colors.darkGrey}
          />
          <TextInput
            style={styles.imput}
            ref={(ref)=>{
              this.passTextInput = ref;
            }}
            // secureTextEntry={showPass}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t=>setPass(t)}
            cursorColor={Colors.darkGrey}
            placeholderTextColor={Colors.darkGrey}
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
