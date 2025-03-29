import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {AuthenticationContext} from './Authentication';

export const NotificationsContext = createContext({});

export const NotificationsProvider = ({children}) => {
  const [notification, setNotification] = useState(null);
  const [initialRouteAuth, setInitialRouteAuth] = useState('Preload');
  const [initialRouteApp, setInitialRouteApp] = useState('Eventos');
  const {user} = useContext(AuthenticationContext);

  useEffect(() => {
    /*
      Inscreve os listeners para os 3 tipos de processamento de notifications.
      Obs.: Para que estes listeners funcionem, no arquivo index.js (na raiz do app) você
      deve registrar o messaging().setBackgroundMessageHandler(async remoteMessage => {}).
    */

    //quando o app está fechado (testado, ok)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          'Notification recebida com o app fechado (activity onDestroy): ',
          remoteMessage,
        );
        if (remoteMessage) {
          setNotification(remoteMessage);
          if (remoteMessage.data.route === 'admin') {
            setInitialRouteApp('Anotacoes');
          } else if (remoteMessage.data.route === 'user') {
            setInitialRouteApp('Perfil');
          }
          //TODO: abrir a notification na página
        }
      });

    //quando o app está parado (testado, ok)
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification recebida com o app parado (activity onStop): ',
        remoteMessage,
      );
      if (remoteMessage) {
        setNotification(remoteMessage);
        //TODO: abrir a notification na página correta
        setInitialRoute('Eventos');
      }
    });

    //quando o app está aberto (testado, ok)
    messaging().onMessage(async remoteMessage => {
      console.log(
        'Notification recebida com o app aberto (activity na tela): ',
        remoteMessage,
      );
      if (remoteMessage) {
        setNotification(remoteMessage);
        switch (remoteMessage.data.route) {
          case 'admin':
            Alert.alert('admin', 'Tópico: ' + remoteMessage.data.route, [
              {text: 'ir', onPress: () => {}}, //TODO: abrir a notification na página correta
              {text: 'não', onPress: () => {}},
            ]);
            break;
          case 'user':
            Alert.alert('user', 'Tópico: ' + remoteMessage.data.route, [
              {text: 'ir', onPress: () => {}}, //TODO: abrir a notification na página correta
              {text: 'não', onPress: () => {}},
            ]);
            break;
        }
      }
    });
  }, []);

  useEffect(() => {
    /*
      Inscreve e desinscreve em um tópico.
    */
    if (user) {
      switch (user.perfil) {
        case 'admin':
          messaging().subscribeToTopic(user.perfil);
          messaging().unsubscribeFromTopic('user');
          break;
        case 'user':
          messaging().subscribeToTopic(user.perfil);
          messaging().unsubscribeFromTopic('admin');
          break;
      }
    }
  }, [user]);

  return (
    <NotificationsContext.Provider value={{}}>
      {children}
    </NotificationsContext.Provider>
  );
};
