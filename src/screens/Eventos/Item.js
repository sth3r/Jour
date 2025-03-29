import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, Card, Text, Icon} from '@rneui/themed';
import OutlineButton from '../../components/OutlineButton';

export default ({item, onPress}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    card: {
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: theme.colors.primaryDark,
      backgroundColor: theme.colors.background,
    },
    title: {
      color: theme.colors.primaryDark,
      fontSize: 20,
      fontWeight: 'bold',
    },
    divider: {
      width: 260,
    },
    div_descricao: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    div_dia: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    div_hora: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    descricao: {
      textAlign: 'center',
      color: theme.colors.primaryDark,
      fontSize: 16,
    },
  });

  return (
    <Card containerStyle={styles.card}>
      {/* <Icon
        type="ionicon"
        name="calendar-outline"
        size={22}
        color={theme.colors.grey2}
      /> */}
      <Card.Title style={styles.title}>{item.nome}</Card.Title>
      <Card.Divider color={theme.colors.primary} style={styles.divider} />
      <View style={styles.div_descricao}>
        <Text style={styles.descricao}>{item.descricao}</Text>
      </View>
      {/* <View style={styles.div_dia}>
        <Text style={styles.dia}>{item.dia}</Text>
      </View> */}
      {/* <View style={styles.div_hora}>
        <Text style={styles.hora}>{item.hora}</Text>
      </View> */}
      <OutlineButton texto={'Detalhar'} onClick={onPress} />
    </Card>
  );
};
