// import { Body, TextInput } from './styles';
import React, {useContext, useState} from 'react';
import Botao from '../../components/botao';
import { Colors } from '../../assets/colors';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, SafeAreaView, Alert} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Loading from '../../components/loading';
import {AuthUserContext, AuthUserProvider} from '../../context/AuthUserProvider';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  // const [loading, setLoading] = useState(false);
  const {signUp} = useContext(AuthUserContext);
  const [showPass, setShowPass] = useState(true);

  // const {theme} = useTheme();

  const cadastrar = async () => {
    if (nome !== '' && email !== '' && pass !== '' && confPass !== ''){
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(()=>{
          let user = auth().currentUser;
          user
            .sendEmailVerification()
            .then(()=>{
              Alert.alert('Confirme seu email', 'Foi enviado um email para: ' + email + ' verificação');
              navigation.dispatch(
                CommonActions.reset({
                  index:0,
                  routes: [{name: 'SignIn'}],
                })
              );
            })
          .catch((e)=>{
            console.log('SignUp: erro em entrar: ' + e);
          });

        })
        .catch((e)=>{
        console.log('SignUp: erro em entrar: ' + e);
        switch(e.code){
          case 'auth/invalid-email':
            Alert.alert('Email mal formatado', 'Use a formatação correta');
            break;
          case 'auth/email-already-exists':
            Alert.alert('Email invalido', 'esse email pode já estar em uso, se esse email for seu entre em contato para correção');
            break;
          case 'auth/too-many-requests':
            Alert.alert('Excesso de tentativas', 'Bloqueamos todas as tentativas de acesso vindas deste aparelho por excesso de tentativas e/ou atividade estranha, tente novamente mais tarde');
            break;
          case 'auth/invalid-password	':
            Alert.alert('Senha muito fraca', 'A senha precisa ter pelo menos 6 caracteres');
            break;
        }
        });
    } else{
      Alert.alert('Erro', 'Campos vazios');
    }
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
            // returnKeyType="send"
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
