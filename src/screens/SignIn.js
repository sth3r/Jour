import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import Botao from '../components/botao';
import { Colors } from '../assets/colors';

const SignIn = (props) => {
  const recuperarSenha = () => {
    alert('abrir modal recuperar senha');
  };
  const entrar = () => {
    alert('logar no sistema');
  };

  return (
    <View style={styles.container}>

      <View style={styles.divCadastro}>
        <Text style={styles.criarConta}>criar conta</Text>
      </View>
      <View style={styles.divForm}>
      <View style={styles.linha} />
        <Image
          style={styles.image}
          source={require('../assets/images/pato.jpg')}
          accessibilityLabel="Imagem de um patinho com um caderno em um ambiente com folhas ao ar"
          />
        <TextInput style={styles.imput} />
        <TextInput style={styles.imput} />
        <Text
          style={styles.esqueceuSenha}
          onPress={recuperarSenha}>
            Esqueceu sua senha?</Text>
        <Botao texto="ENTRAR" onClick={entrar} />
      </View>

    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
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
    borderBottomColor: Colors.roxo,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    color: Colors.roxo,
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
