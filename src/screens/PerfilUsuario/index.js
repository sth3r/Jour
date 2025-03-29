import React, { useContext, useEffect, useState } from 'react';
import { Alert, ToastAndroid, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { AuthUserContext } from '../../context/AuthUserProvider';
import { UserContext } from '../../context/UserProvider';
import { useTheme, ButtonGroup, Input, Image } from '@rneui/themed';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../../assets/colors';
import Botao from '../../components/botao';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  /* margin: 10px; */
  margin-top: 10px;
  background-color: #fff3e8;
`;

const Scroll = styled.ScrollView`
  background-color: ${Colors.secundary};
`;

export default ({ navigation }) => {
  const { user } = useContext(AuthUserContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassConfirm, setNePassConfirm] = useState('');
  const [showPass, setShowPass] = useState(true);
  // const [loading, setLoading] = useState(false);
  const [urlDevice, setUrlDevice] = useState('');
  const { save, del, updatePassword } = useContext(UserContext);
  const { theme } = useTheme();

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
    }
  }, [user]);

  function salvar() {
    if (oldPass === '' && newPass === '' && newPassConfirm === '') {
      Alert.alert(
        'Fique Esperto!',
        'Você tem certeza que deseja alterar estes dados?',
        [
          {
            text: 'Não',
            onPress: () => { },
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              // setLoading(true);
              /*
                Para evitar que dados sensíveis sejam enviados para
                o Firestore, um novo objeto é criado.
              */
              let localUser = {};
              localUser.uid = user.uid;
              localUser.nome = nome;
              if (await save(localUser, urlDevice)) {
                ToastAndroid.show(
                  'Show! Você salvou os dados com sucesso.',
                  ToastAndroid.LONG,
                );
              } else {
                ToastAndroid.show('Ops! Erro ao salvar.', ToastAndroid.LONG);
              }
              // setLoading(false);
              navigation.goBack();
            },
          },
        ],
      );
    }
  }

  const buscaNaGaleria = () => {
    const options = {
      storageOptions: {
        title: 'Selecionar  uma imagem',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
        width: 150,
        height: 200,
      },
    };

    launchImageLibrary(options, response => {
      if (response.errorCode) {
        ToastAndroid.show('Ops! Erro ao buscar a imagem.', ToastAndroid.LONG);
      } else if (response.didCancel) {
        ToastAndroid.show('Ok, você cancelou.', ToastAndroid.LONG);
      } else {
        const path = response.assets[0].uri;
        setUrlDevice(path); //armazena a uri para a imagem no device
      }
    });
  };

  function tiraFoto() {
    const options = {
      storageOptions: {
        title: 'Tirar uma foto',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
        width: 150,
        height: 200,
      },
    };

    launchCamera(options, response => {
      if (response.errorCode) {
        ToastAndroid.show('Ops! Erro ao tirar a foto.', ToastAndroid.LONG);
      } else if (response.didCancel) {
        ToastAndroid.show('Ok, você cancelou.', ToastAndroid.LONG);
      } else {
        const path = response?.assets[0]?.uri;
        //console.log(path);
        setUrlDevice(path); //armazena a uri para a imagem no device
      }
    });
  }

  function buscarImagemNoDevice(v) {
    switch (v) {
      case 0:
        buscaNaGaleria();
        break;
      case 1:
        tiraFoto();
        break;
    }
  }

  return (
    <Scroll>
      <Container style={styles.container}>
        <Image
          // style={styles.image}
          source={
            urlDevice !== ''
              ? { uri: urlDevice }
              : user.urlFoto !== ''
                ? { uri: user.urlFoto }
                : {
                  uri: 'https://firebasestorage.googleapis.com/v0/b/banco-dos-quadrinhos.appspot.com/o/images%2Fperson.png?alt=media&token=2be8523f-4c17-4a09-afbb-301a95a5ddfb&_gl=1*18jiiyk*_ga*MjA2NDY5NjU3NS4xNjg4MTI5NjYw*_ga_CW55HF8NVT*MTY5NjAyMzQxOS4zMS4xLjE2OTYwMjU4NzQuMzMuMC4w',
                }
          }
          // PlaceholderContent={<Loading />}
        />
        <ButtonGroup
          buttons={['Buscar na Galeria', 'Tira Foto']}
          onPress={v => buscarImagemNoDevice(v)}
          containerStyle={{
            borderColor:
              theme.mode === 'light'
                ? theme.colors.black
                : theme.colors.primary,
            backgroundColor: theme.colors.white,
          }}
          textStyle={{
            color:
              theme.mode === 'light'
                ? theme.colors.black
                : theme.colors.primary,
          }}
        />
        <Input
          style={styles.imput}
          value={nome}
          placeholder="nome"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={t => setNome(t)}
        />
        <Input
          style={styles.imput}
          value={email}
          editable={false}
          placeholder="email"
          keyboardType="default"
          returnKeyType="next"
        />
        <Botao texto="Salvar" onClick={salvar} />
        <Botao texto="Configurações de conta" onClick={() => navigation.navigate('Menu')} />
        {/* <Loading visivel={loading} /> */}
      </Container>
    </Scroll>
  );
};


const styles = StyleSheet.create({
  placeholder: {
    color: Colors.darkGrey,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    color: Colors.roxo,
    backgroundColor: Colors.backgroundColor,
    fontFamily: 'Poppins',
  },
  divCadastro: {
    flex: 0,
    alignItems: 'left',
    marginTop: 5,
    marginBottom: 20,
    // backgroundColor: '#0f0',

  },
  divForm: {
    flex: 8,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  image: {
    width: 300,
    height: 200,
    margin: 10,
  },
  imput: {
    width: '95%',
    height: 50,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    color: Colors.darkGrey,
  },
  esqueceuSenha: {
    fontSize: 15,
    color: Colors.roxo,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  linha: {
    flex: 0,
    alignItems: 'center',
    width: '100%',
    height: 1,
    borderBottomColor: Colors.roxo,
    borderBottomWidth: 1.5,
  },
  entrar: {
    fontSize: 20,
    color: Colors.roxo,
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 5,
  },
});
