import React, { createContext, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null); //usuário que está na sessão

  /*
    Cache criptografado do usuário
  */
  async function storeUserSession(localEmail, pass) {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          email: localEmail,
          pass,
        }),
      );
    } catch (e) {
      console.error('AuthUserProvider, storeUserSession: ' + e);
    }
  }

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session) : null;
    } catch (e) {
      console.error('AuthUserProvider, retrieveUserSession: ' + e);
    }
  }

  /*
    Funções do processo de Autenticação
  */
  async function signUp(localUser, pass) {
    try {
      await auth().createUserWithEmailAndPassword(localUser.email, pass);
      await auth().currentUser.sendEmailVerification();
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .set(localUser);
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function signIn(email, pass) {
    try {
      await auth().signInWithEmailAndPassword(email, pass);
      if (!auth().currentUser.emailVerified) {
        return 'Você deve validar seu email para continuar.';
      }
      await storeUserSession(email, pass);
      if (await getUser(pass)) {
        return 'ok';
      } else {
        return 'Problemas ao buscar o seu perfil. Contate o administrador.';
      }
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function forgotPass(email) {
    try {
      await auth().sendPasswordResetEmail(email);
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function signOut() {
    try {
      setUser(null);
      await EncryptedStorage.removeItem('user_session');
      if (auth().currentUser) {
        await auth().signOut();
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  //busca os detalhes do user no nó users e o armazena no state user
  async function getUser(pass) {
    try {
      let doc = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get();
      if (doc.exists) {
        //console.log('Document data:', doc.data());
        doc.data().uid = auth().currentUser.uid;
        doc.data().pass = pass;
        setUser(doc.data());
        return doc.data();
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  //função utilitária
  function launchServerMessageErro(e) {
    switch (e.code) {
      case 'auth/wrong-password':
        Alert.alert('Ops', 'Senha errada');
        return 'Erro na senha.';
      case 'auth/user-disabled':
        Alert.alert('Opsie', 'Esse usuario está desabilitado');
        break;
      case 'auth/invalid-email':
        Alert.alert('Email mal formatado', 'Use a formatação correta');
        break;
      case 'auth/email-already-in-use':
        Alert.alert('Email invalido', 'esse email pode já estar em uso, se esse email for seu entre em contato para correção');
        break;
      case 'auth/too-many-requests':
        Alert.alert('Excesso de tentativas', 'Bloqueamos todas as tentativas de acesso vindas deste aparelho por excesso de tentativas e/ou atividade estranha, tente novamente mais tarde');
        break;
      case 'auth/weak-password':
        Alert.alert('Senha muito fraca', 'A senha precisa ter pelo menos 6 caracteres');
        break;
      case 'auth/user-not-found':
        Alert.alert('Oops', 'Usuario não encontrado');
        break;
      case 'auth/invalid-credential':
        Alert.alert('Erro', 'Email ou senha errados');
        break;
      default:
        return 'Erro desconhecido. Contate o administrador';
    }
  }

  return (
    <AuthUserContext.Provider
      value={{
        user,
        signUp,
        signIn,
        retrieveUserSession,
        forgotPass,
        signOut,
        getUser,
      }}>
      {children}
    </AuthUserContext.Provider>
  );
};
