import React, {useEffect, useState, useContext} from 'react';
import {
  Alert,
  ToastAndroid,
  Button,
  Modal,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import styled from 'styled-components/native';
import MyButtom from '../../components/MyButtom';
import Loading from '../../components/Loading';
import DeleteButton from '../../components/OutlineButton';
import {AnotacaoContext} from '../../context/AnotacaoProvider';
import {useTheme, ButtonGroup, Input, Icon} from '@rneui/themed';
import ColorPicker,{Panel3, Swatches, Preview, HueSlider} from 'reanimated-color-picker';
import {SelectList} from 'react-native-dropdown-select-list';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-top: 40px;
`;

const Scroll = styled.ScrollView``;

export default ({route, navigation}) => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  // const [fonte, setFonte] = React.useState('');
  // const [cor, setCor] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {save, del} = useContext(AnotacaoContext);
  const {theme} = useTheme();

  const [showModal, setShowModal] = useState(false);

  // const onSelectColor = ({hex}) => {
  //   // do something with the selected color.
  //   console.log(hex);
  // };

  const data = [
    {key: 'Arial', value: 'Arial'},
    {key: 'Roboto', value: 'Roboto'},
    {key: 'Times New Roman', value: 'Times New Roman'},
    {key: 'Comic Sans', value: 'Comic Sans'},
    {key: 'small-caps', value: 'small-caps'},
  ];

  useEffect(() => {
    if (route.params.value) {
      setTitulo(route.params.value.titulo);
      setConteudo(route.params.value.conteudo);
      // setFonte(route.params.value.fonte);
      // setCor(route.params.value.cor);
      // setUid(route.params.value.uid);
    }
  }, [route]);

  useEffect(() => {}, []);

  const salvar = async () => {
    setLoading(true);
    if (
      //e salva o registro
      await save({
        uid,
        titulo,
        conteudo,
        // fonte,
        // cor,
      })
    ) {
      ToastAndroid.show('Show! Você salvou com sucesso.', ToastAndroid.LONG);
      setConteudo('');
      navigation.goBack();
    } else {
      ToastAndroid.show('Ops!Deu problema ao salvar.', ToastAndroid.LONG);
    }
    setLoading(false);
  };

  async function excluir() {
    console.log('entro aqui');
    Alert.alert('Você tem certeza que deseja excluir?', 'aaaa', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          console.log('aqui tmb');
          setLoading(true);
          if (await del(uid)) {
            ToastAndroid.show('Excluído', ToastAndroid.LONG);
          } else {
            ToastAndroid.show('Deu problema ao excluir.', ToastAndroid.SHORT);
          }
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <Scroll>
      <Container>
        <Input
          placeholder="Titulo"
          keyboardType="default"
          returnKeyType="go"
          // leftIcon={
          //   <Icon
          //     type="ionicon"
          //     name="person-outline"
          //     size={22}
          //     color={theme.colors.grey2}
          //   />
          // }
          onChangeText={t => setTitulo(t)}
          value={titulo}
        />
        <Input
          placeholder="Conteudo"
          multiline
          numberOfLines={4}
          keyboardType="default"
          returnKeyType="go"
          // leftIcon={
          //   <Icon
          //     type="ionicon"
          //     name="rocket-outline"
          //     size={22}
          //     color={theme.colors.grey2}
          //   />
          // }
          onChangeText={t => setConteudo(t)}
          value={conteudo}
        />
        {/* <ButtonGroup
          buttonStyle={{padding: 10}}
          selectedButtonStyle={{backgroundColor: '#e2e2e2'}}
          buttons={[
            <Icon name="format-align-left" />,
            <Icon name="format-align-center" />,
            <Icon name="format-align-right" />,
          ]}
        /> */}
        {/* <SelectList
          placeholder="Fonte"
          setSelected={t => setFonte(t)}
          search={false}
          data={data}
          value={fonte}
          fontFamily={data.value}
        /> */}
        <Button title="Cor" onPress={() => setShowModal(true)} />
        {/* <Modal visible={showModal} animationType="slide">
          <ColorPicker
            style={{width: '70%'}}
            value="red"
            onComplete={t => setCor(t.hex)}>
            <Preview />
            <Panel3 />
            <HueSlider />
            {/* <OpacitySlider /> */}
            {/* <Swatches />
          </ColorPicker>

          <Button title="Ok" onPress={() => setShowModal(false)} />
        </Modal> */}
        <MyButtom
          texto="Salvar"
          aoClicar={() => {
            salvar();
          }}
        />
        {uid && (
          <DeleteButton
            texto="Excluir"
            onClick={() => {
              excluir();
            }}
          />
        )}
        <Loading visivel={loading} />
      </Container>
    </Scroll>
  );
};
