import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Botao from '../components/botao';

const Home = () => {
  const [contador, setContador] = useState(0);

// 1. toda vez que a pagina for atualizada
  useEffect(()=>{
    console.log('componente montado');
  },[]);

// 2. toda vez que o componente for atualizado
  useEffect(()=>{
    console.log('fez update no componente');
  });

// 3.. toda vez que o componente contador for atualizado
  useEffect(()=>{
    console.log('fez update no componente contador');
  },[contador]);

  const contar = () => {
    setContador(contador + 1);
  };

  const reset = ()=>{
    setContador(0);
  };

  return (
  <View>
    <Text style={styles.texto}>oi</Text>
    <Text style={styles.texto}>Contador: {contador}</Text>
    <Botao texto="Contar" onClick={contar}/>
    <Botao texto="reset" onClick={reset}/>
  </View>
  );
};

const styles = StyleSheet.create({
  texto:{
    fontSize:24,
  },
});

export default Home;
