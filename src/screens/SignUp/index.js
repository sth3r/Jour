import React, { useState } from 'react';
// import { Body, TextInput } from './styles';
import Botao from '../../components/botao';
import { Colors } from '../../assets/colors';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, SafeAreaView, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [ConfPass, setConfPass] = useState('');

  const cadastrar = () => {
    alert('foi');
  };

  const entrar = () => {
    // navigation.navigate('SignIn');

    navigation.dispatch(
      CommonActions.reset({
        index:0,
        routes: [{name: 'SignIn'}],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divCadastro}>
          <Text style={styles.entrar} onPress={entrar}>entrar</Text>
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
            placeholder="Nome Completo"
            keyboardType="default"
            returnKeyType="next"
            onChangeText={t=>setNome(t)}
            onEndEditing={()=>this.emailTextInput.focus()}
            placeholderTextColor={Colors.roxo}
          />
          <TextInput
            style={styles.imput}
            ref={(ref)=>{
              this.emailTextInput = ref;
            }}
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
            returnKeyType="next"
            onChangeText={t=>setPass(t)}
            cursorColor={Colors.darkGrey}
            placeholderTextColor={Colors.roxo}
            onEndEditing={()=>this.confPassTextInput.focus()}
          />
          <TextInput
            style={styles.imput}
            ref={(ref)=>{
              this.confPassTextInput = ref;
            }}
            secureTextEntry={true}
            placeholder="Confirme sua senha"
            keyboardType="default"
            returnKeyType="send"
            onChangeText={t=>setConfPass(t)}
            cursorColor={Colors.darkGrey}
            placeholderTextColor={Colors.roxo}
            onEndEditing={()=>cadastrar()}
          />
          <Botao texto="CRIAR CONTA" onClick={cadastrar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;


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
  entrar:{
    fontSize: 20,
    color: Colors.roxo,
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 5,
  },
});
