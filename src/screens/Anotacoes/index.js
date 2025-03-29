import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import {AnotacaoContext} from '../../context/AnotacaoProvider';
import Item from './Item';
import FloatButtonAdd from '../../components/FloatButtonAdd';
import SearchBar from '../../components/SearchBar';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
`;

const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;

export default ({navigation}) => {
  const {anotacoes} = useContext(AnotacaoContext);
  const [anotacoesTemp, setAnotacoesTemp] = useState([]);

  const filterByName = Text => {
    if (Text !== '') {
      let a = [];
      anotacoes.forEach(e => {
        if (e.titulo.toLowerCase().includes(Text.toLowerCase())) {
          a.push(e);
        }
      });

      a.push(
        ...anotacoes.filter(e =>
          e.titulo.toLowerCase().includes(Text.toLowerCase()),
        ),
      );

      if (a.length > 0) {
        setAnotacoesTemp(a);
      }
    } else {
      setAnotacoesTemp([]);
    }
  };

  const routeAnotacao = value => {
    navigation.navigate('Anotacao', {
      value,
    });
  };

  return (
    <Container>
      <SearchBar text="O que você procura?" setSearch={filterByName} />
      {/* {anotacoesTemp.length > 0
            ? anotacoesTemp.map((v, k) => (
                <Item item={v} onPress={() => routeAnotacao(v)} key={k} />
              ))
            : anotacoes.map((v, k) => (
                <Item item={v} onPress={() => routeStudent(v)} key={k} />
              ))} */}
      <FlatList
        data={anotacoesTemp.length > 0 ? anotacoesTemp : anotacoes}
        renderItem={({item}) => (
          <Item
            item={item}
            onPress={() => routeAnotacao(item)}
            key={item.uid}
          />
        )}
        keyExtractor={item => item.uid}
      />
      <FloatButtonAdd onClick={() => routeAnotacao(null)} />
    </Container>
  );
};
