import React, {useContext, useEffect, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import ItemEvento from '../Eventos/Item';
import ItemAnotacao from '../Anotacoes/Item';
import FloatButtonAdd from '../../components/FloatButtonAdd';
import SearchBar from '../../components/SearchBar';
import {EventoContext} from '../../context/EventoProvider';
import {AnotacaoContext} from '../../context/AnotacaoProvider';
import {ScrollView, SectionList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Alert} from 'react-native';
import {COLORS, darkMode, Colors} from '../../assets/colors';
import {Icon} from '@rneui/base';
import { collection, query, where } from "firebase/firestore";


const Container = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
`;

const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
    color: '#fff',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  texto:{
    color: Colors.darkGrey,
  },
});

const Scroll = styled.ScrollView``;

export default ({navigation}) => {
  const {eventos} = useContext(EventoContext);
  const [eventosTemp, setEventosTemp] = useState([]);
  const {anotacoes} = useContext(AnotacaoContext);
  const [anotacoesTemp, setAnotacoesTemp] = useState([]);

  const routeEvento = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Evento',
        params: {evento: item},
      }),
    );
  };

  const routeAnotacao = value => {
    navigation.navigate('Anotacao', {
      value,
    });
  };


  const add = async () => {
    Alert.alert('.', '!', [
      {
        text: 'Evento',
        onPress: async () => routeEvento(null),
      },
      {
        text: 'Anotacao',
        onPress: async () => routeAnotacao(null),
      },
    ]);
  };

  const [cont, setCont] = useState(0);

  function incrementar() {
    Alert.alert('a');
    setCont(cont + 1);
  }

  function decrementar() {
    setCont(cont - 1);
  }

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }
  const [currentDate, setCurrentDate] = useState(getDate());

  useEffect(() => {
    if(item => (item.data) === currentDate);

    const filtro = eventos.filter(
      item => item.data === currentDate,
    );
    setEventosTemp(filtro);
  }, [eventos]);

// Create a reference to the cities collection
// const eventosRef = db.collection('eventos');

// Create a query against the collection
// const queryRef = eventosRef.where('data', '==', 'currentDate');

  return (
    <Container>
      {/* <Icon
        name="arrow-left"
        size={20}
        color="black"
        type="ionicons"
        onPress={decrementar}
      /> */}
      <Text style={styles.texto}>{currentDate}</Text>
      {/* <Text
        style={{
          // color: darkMode.accent,
        }}>{` ${new Date().toLocaleDateString()}`}</Text> */}
      {/* <Icon
        name="arrow-right"
        size={20}
        color="black"
        type="ionicons"
        onPress={incrementar}
      /> */}
      <FlatList
        data={eventosTemp.length > 0 ? eventosTemp : eventos}
        renderItem={({item}) => (
          <ItemEvento item={item} onPress={() => routeEvento(item)} />
        )}
        keyExtractor={item => item.uid}
      />
      <FlatList
        data={anotacoesTemp.length > 0 ? anotacoesTemp : anotacoes}
        renderItem={({item}) => (
          <ItemAnotacao item={item} onPress={() => routeAnotacao(item)} />
        )}
        keyExtractor={item => item.uid}
      />
      <FloatButtonAdd onClick={() => add(null)} />
    </Container>
  );
};


