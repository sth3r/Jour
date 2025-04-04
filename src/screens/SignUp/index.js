import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, SafeAreaView, Alert} from 'react-native';
import Botao from '../../components/botao';
import {AuthUserContext} from '../../context/AuthUserProvider';
import styled from 'styled-components/native';
import {useTheme} from '@rneui/themed';
import { Colors } from '../../assets/colors';

export const Body = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  /* margin: 10px; */
  margin-top: 10px;
  background-color: #fff3e8;
`;

export default ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);
  const {signUp} = useContext(AuthUserContext);
  const {theme} = useTheme();

  const cadastrar = async () => {
    let msgError = '';
    if (nome !== '' && email !== '' && pass !== '' && confirPass !== '') {
      if (pass === confirPass) {
        let user = {};
        user.nome = nome;
        user.email = email;
        setLoading(true);
        msgError = await signUp(user, pass);
        if (msgError === 'ok') {
          setLoading(false);
          Alert.alert(
            'Show!',
            'Foi enviado um email para:\n' +
              user.email +
              '\nFaça a verificação.',
          );
          navigation.goBack();
        } else {
          setLoading(false);
          Alert.alert('Ops!', msgError);
        }
      } else {
        Alert.alert('Ops!', 'As senhas digitadas são diferentes.');
      }
    } else {
      Alert.alert('Ops!', 'Por favor, digite todos os campos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divCadastro}>
          <Text style={styles.entrar} onPress={() => navigation.navigate('SignIn')}>entrar</Text>
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
            // returnKeyType="send"
            onChangeText={t=>setConfirmPass(t)}
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
