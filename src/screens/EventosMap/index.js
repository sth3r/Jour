/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {EventoContext} from '../../context/EventoProvider';
import {useTheme, Icon, Button} from '@rneui/themed';

export default ({route, navigation}) => {
  const [mapType, setMapType] = useState('standard');
  const {eventos} = useContext(EventoContext);
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  //TODO: repensar a feature "obter as coordenadas no map"
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        ref={map => (this.map = map)}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={e => {
          if (route.params !== undefined) {
            route.params.evento.latitude =
              e.nativeEvent.coordinate.latitude.toString();
            route.params.evento.longitude =
              e.nativeEvent.coordinate.longitude.toString();
            Alert.alert(
              'Show!',
              'Latitude= ' +
                e.nativeEvent.coordinate.latitude +
                '\nLongitude= ' +
                e.nativeEvent.coordinate.longitude +
                '\nConfirmar esse local?',
              [
                {
                  text: 'Não',
                  onPress: () => {
                    route.params = undefined;
                  },
                  style: 'cancel',
                },
                {
                  text: 'Sim',
                  onPress: () => {
                    let evento = {
                      nome: route.params.evento.nome,
                      descricao: route.params.evento.descricao,
                      data: route.params.evento.data,
                      latitude: route.params.evento.latitude,
                      longitude: route.params.evento.longitude,
                    };
                    route.params = undefined;
                    navigation.navigate({
                      name: 'Evento',
                      params: {evento},
                    });
                  },
                  style: 'cancel',
                },
              ],
            );
          }
        }}
        initialRegion={{
          //região onde deve focar o mapa na inicialização
          latitude: -31.766453286495448,
          longitude: -52.351914793252945,
          latitudeDelta: 0.0015, //baseado na documentação
          longitudeDelta: 0.00121, //baseado na documentação
        }}>
        {eventos.map(evento => {
          return (
            <Marker
              key={evento.uid}
              coordinate={{
                latitude: Number(evento.latitude),
                longitude: Number(evento.longitude),
              }}
              title={evento.nome}
              description={evento.descricao}
              draggable>
              <Icon
                type="MaterialIcons"
                name="place"
                color={
                  mapType === 'standard'
                    ? theme.colors.primary
                    : theme.colors.white
                }
                size={35}
              />
            </Marker>
          );
        })}
      </MapView>
      <Button
        title={mapType === 'standard' ? 'Padrão' : 'Satélite'}
        onPress={() =>
          mapType === 'standard'
            ? setMapType('satellite')
            : setMapType('standard')
        }
        containerStyle={{
          width: '35%',
          backgroundColor: theme.colors.transparent,
        }}
        buttonStyle={{
          backgroundColor: theme.colors.transparent,
          borderColor:
            mapType === 'standard' ? theme.colors.primary : theme.colors.white,
          borderWidth: 1,
        }}
        titleStyle={{
          color:
            mapType === 'standard' ? theme.colors.primary : theme.colors.white,
        }}
      />
    </View>
  );
};
