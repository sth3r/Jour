import React, {useState, useEffect, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import Botao from '../../components/botao';
import OutlineButton from '../../components/OutlineButton';
import Loading from '../../components/Loading';
import {EventoContext} from '../../context/EventoProvider';
import {useTheme, Input, Icon} from '@rneui/themed';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
// import {Text} from '@rneui/base';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-top: 20px;
`;

const Scroll = styled.ScrollView``;

export default ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState(dayjs());
  //const [showPicker, setShowPicker] = useState(false);
  const [hora, setHora] = useState('');
  //const [showPickerHora, setShowPickerHora] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveEvento, updateEvento, deleteEvento} = useContext(EventoContext);
  const {theme} = useTheme();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    // console.log(route.params);
    if (route.params.evento) {
      console.log('rotinha', route.params.evento);
      setUid(route.params.evento.uid);
      setNome(route.params.evento.nome);
      // setData(route.params.evento.data);
      // // setHora(route.params.evento.hora);
      setDescricao(route.params.evento.descricao);
      // setLatitude(route.params.evento.latitude);
      // setLongitude(route.params.evento.longitude);
    }
  }, [route]);

  const salvar = async () => {
    if (nome && descricao && data && latitude && longitude) {
      let evento = {};
      evento.nome = nome;
      evento.data = data;
      // evento.hora = hora;
      evento.descricao = descricao;
      // evento.latitude = latitude;
      // evento.longitude = longitude;
      setLoading(true);
      console.log(uid);
      if (uid) {
        evento.uid = uid;
        if (await updateEvento(evento)) {
          ToastAndroid.show(
            'Show! Você alterou com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      } else {
        if (await saveEvento(evento)) {
          ToastAndroid.show(
            'Show! Você inluiu com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      }
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert(
      'Fique Esperto!',
      'Você tem certeza que deseja excluir o evento?',
      [
        {
          Text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          Text: 'Sim',
          onPress: async () => {
            setLoading(true);
            if (await deleteEvento(uid)) {
              ToastAndroid.show(
                'Show! Você excluiu com sucesso.',
                ToastAndroid.LONG,
              );
            } else {
              ToastAndroid.show('Ops! Erro ao excluir.', ToastAndroid.LONG);
            }
            setLoading(false);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <Scroll>
      <Container>
        <Input
          placeholder="Nome do evento"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="text-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setNome(t)}
          value={nome}
        />
        <Input
          placeholder="Descrição"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="clipboard-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setDescricao(t)}
          value={descricao}
        />
        <DateTimePicker value={data} onValueChange={date => setData(date)} />
        {/* <Input
          placeholder="Hora"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="time-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setHora(t)}
          value={hora}
        /> */}
        {/* <Input
          placeholder="Latitude"
          editable={false}
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="material-community"
              name="map-marker-check-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setLatitude(t)}
          value={latitude}
        />
        <Input
          placeholder="Longitude"
          editable={false}
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="material-community"
              name="map-marker-check-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setLongitude(t)}
          value={longitude}
        /> */}
        <Botao texto="Salvar" aoClicar={salvar} />
        {uid ? <OutlineButton texto="Excluir" onClick={excluir} /> : null}
        {/* <OutlineButton
          texto="Obter Coordenadas no Mapa"
          onClick={() =>
            navigation.navigate('EventosMap', {
              evento: {
                uid,
                nome,
                data,
                // hora,
                descricao,
                // latitude,
                // longitude,
              },
            })
          }
        /> */}
        <Loading visivel={loading} />
      </Container>
    </Scroll>
  );
};
