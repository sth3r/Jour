import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Botao from './src/components/botao';

const Jour = () => {
  const contar = () => {
    alert('clicou');
  };
  return (
  <View>
    <Text style={styles.texto}>oi</Text>
    <Botao texto="Salvar" onClick={contar}/>
  </View>
  );
};

const styles = StyleSheet.create({
  texto:{
    fontSize:24,
  },
});

export default Jour;
