import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

const Botao = (props) =>{
    console.log(props);
    return(
      <TouchableHighlight style={styles.button} onPress={()=>props.onClick()}>
        <Text>{props.texto}</Text>
      </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    texto:{
      fontSize:24,
    },
    button:{
      alignItems: 'center',
      backgroundColor: '#ffe51f',
      padding: 10,
      margin: 10,
    }
  });

export default Botao;
