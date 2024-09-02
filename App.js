import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Botao from './src/components/botao';

const Jour = () => {
  const [contador, setContador] = useState(0);

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

export default Jour;
