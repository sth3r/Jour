import React, {useContext, useState} from 'react';
import {AuthUserContext} from '../../context/AuthUserProvider';
import styled from 'styled-components/native';
import {useTheme} from '@rneui/themed';
import { View, TextInput, StyleSheet, Alert} from 'react-native';
import { Colors } from '../../assets/colors';
import Botao from '../../components/botao';
import auth from '@react-native-firebase/auth';

export const Body = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  /* margin: 10px; */
  margin-top: 10px;
  background-color: #fff3e8;
`;

export default ({navigation}) => {
  const [email, setEmail] = useState('');
  const {forgotPass} = useContext(AuthUserContext);
  const {theme} = useTheme();

  const recover = ()=>{
    if(email !== ''){
        console.log(email);
        auth()
        .sendPasswordResetEmail(email)
        .then((r)=>{
            Alert.alert('Atenção', 'Enviamos um email de recuperação de senha para o seguinte endereço: ' +
            email,
            [{text: 'OK', onPress: ()=> navigation.navigate('SignIn')}]
            );
        })
        .catch((e)=>{
            console.log('ForgotPassowrd, recover: ' + e);
            switch(e.code){
            case 'auth/user-not-found':
                Alert.alert('Erro', 'Usuario não cadastrado');
                break;
            case 'auth/invalid-email':
                Alert.alert('Erro', 'Email mal formatado');
                break;
            case 'auth/too-many-requests':
                Alert.alert('Erro', 'Bloqueamos todas as tentativas de acesso vindas deste aparelho por excesso de tentativas e/ou atividade estranha, tente novamente mais tarde');
                break;
            }
        });
    } else{
        Alert.alert('Atenção', 'O campo e-mail está vazio');
    }
};

  return (
    <View style={styles.container}>
            <TextInput
                style={styles.imput}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="go"
                onChangeText={t=>setEmail(t)}
                autoFocus={true}
                placeholderTextColor={Colors.roxo}
            />
            <Botao texto="Recuperar" onClick={recover}/>
        </View>
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
    marginTop: 40,
    color: Colors.darkGrey,
  },
});
