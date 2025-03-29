import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Image, useTheme} from '@rneui/themed';
import OutlineButton from '../../components/OutlineButton';
import Anotacao from '../Anotacao';

export default ({item, onPress}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    card: {
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: theme.colors.primaryDark,
      backgroundColor: item.cor,
      fontFamily: item.fonte,
    },
    title: {
      color: theme.colors.primaryDark,
    },
    divider: {
      width: 260,
    },
    div_anotacao: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titulo: {
      textAlign: 'center',
      color: theme.colors.primaryDark,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{item.titulo}</Card.Title>
      {/* <Card.Divider color={theme.colors.primary} style={styles.divider} /> */}
      <View style={styles.div_anotacao}>
        <Text style={styles.conteudo}>{item.conteudo}</Text>
      </View>
      <OutlineButton texto={'Detalhar'} onClick={onPress} />
    </Card>
  );
};
