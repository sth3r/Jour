import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Colors } from '../assets/colors';

const Botao = (props) =>{
    // console.log(props);
    return(
      <TouchableHighlight style={styles.button} onPress={()=>props.onClick()}>
        <Text style={styles.texto}>{props.texto}</Text>
      </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    texto:{
      fontSize:20,
    },
    button:{
      width: '65%',
      height: 65,
      borderRadius: 50,
      borderColor: Colors.white,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.roxo,
      padding: 15,
      margin: 50,
    },
  });

export default Botao;
