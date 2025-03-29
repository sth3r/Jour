import React, {useContext, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import Item from './Item';
import FloatButtonAdd from '../../components/FloatButtonAdd';
import OutlineButton from '../../components/OutlineButton';
import SearchBar from '../../components/SearchBar';
import {EventoContext} from '../../context/EventoProvider';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
`;

const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;

export default ({navigation}) => {
  const {eventos} = useContext(EventoContext);
  const [eventosTemp, setEventosTemp] = useState([]);

  const filterByName = Text => {
    if (Text !== '') {
      let a = [];
      // estudantes.forEach(e => {
      //   if (e.nome.toLowerCase().includes(text.toLowerCase())) {
      //     a.push(e);
      //   }
      // });

      a.push(
        ...eventos.filter(e =>
          e.nome.toLowerCase().includes(Text.toLowerCase()),
        ),
      );

      if (a.length > 0) {
        setEventosTemp(a);
      }
    } else {
      setEventosTemp([]);
    }
  };

  const routeEvento = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Evento',
        params: {evento: item},
      }),
    );
  };

  const routeAddEvento = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Evento',
        params: {
          evento: {
            nome: '',
            descricao: '',
            // data: '',
            // hora: '',
            // latitude: '',
            // longitude: '',
          },
        },
      }),
    );
  };

  return (
    <Container>
      <SearchBar text="O que você procura?" setSearch={filterByName} />
      <FlatList
        data={eventosTemp.length > 0 ? eventosTemp : eventos}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routeEvento(item)} />
        )}
        keyExtractor={item => item.uid}
      />
      <FloatButtonAdd onClick={routeAddEvento} />
    </Container>
  );
};
