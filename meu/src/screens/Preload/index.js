import React, { useEffect } from 'react';
import { Container, Image } from './styles';
import { Alert } from 'react-native'; // Corrigido
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const Preload = ({ navigation }) => {
    console.log('aaaaaaaa');

    const getUserCache = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            console.log('getUserCache');
            console.log(jsonValue);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log('Preload: erro ao ler user no cache:', e);
        }
    };

    const loginUser = async () => {
        const user = await getUserCache(); // Corrigido
        console.log('aa');
        if (user) {
            console.log('aaaaa');
            auth()
                .signInWithEmailAndPassword(user.email, user.pass)
                .then(() => {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        })
                    );
                })
                .catch((e) => {
                    console.log('SignIn: erro em entrar: ' + e);
                    switch (e.code) {
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
        } else {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'SignIn' }],
                })
            );
        }
    };

    useEffect(() => {
        loginUser();
    }, []);

    return (
        <Container>
            <Image source={require('../../assets/images/pato.jpg')} accessibilityLabel="Imagem de pato com folhas ao ar" />
        </Container>
    );
};

export default Preload;
