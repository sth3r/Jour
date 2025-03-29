/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import SignIn from '../screens/SignIn';
import Eventos from '../screens/Eventos';
import Preload from '../screens/Preload';
import SignUp from '../screens/SignUp';
import Evento from '../screens/Evento';
import Anotacoes from '../screens/Anotacoes';
import ForgotPassword from '../screens/ForgotPassWord';
import Menu from '../screens/Menu';
import PerfilUsuario from '../screens/PerfilUsuario';
import {useTheme, Icon} from '@rneui/themed';
import MudarSenha from '../screens/MudarSenha';
import Dia from '../screens/Dia';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={Preload} name="Preload"/>
    <Stack.Screen component={SignIn} name="SignIn" />
    <Stack.Screen component={SignUp} name="SignUp" />
    <Stack.Screen component={ForgotPassword} name="ForgotPassWord" />
    <Stack.Screen component={MudarSenha} name="MudarSenha" />
  </Stack.Navigator>
);

const AppStack = () => {
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Eventos"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        component={Dia}
        name="Dia"
        options={{
          tabBarLabel: 'Dia',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="book"
              color={
                theme.mode === 'light'
                  ? theme.colors.black
                  : theme.colors.primary
              }
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Eventos}
        name="Eventos"
        options={{
          tabBarLabel: 'Eventos',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="book"
              color={
                theme.mode === 'light'
                  ? theme.colors.black
                  : theme.colors.primary
              }
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Anotacoes}
        name="Anotacoes"
        options={{
          tabBarLabel: 'Anotacoes',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="book"
              color={
                theme.mode === 'light'
                  ? theme.colors.black
                  : theme.colors.primary
              }
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={PerfilUsuario}
        name="Perfil"
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="list"
              color={
                theme.mode === 'light'
                  ? theme.colors.black
                  : theme.colors.black
              }
              size={20}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        component={Menu}
        name="Menu"
        options={{
          tabBarLabel: 'Menu',
        }}
      /> */}
    </Tab.Navigator>
  );
};

const Navigator = () => {
  const {theme} = useTheme();
  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.background,
        },
        dark: theme.mode === 'light',
      }}>
      <StatusBar backgroundColor={theme.colors.black} />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={AuthStack} name="AuthStack" />
        <Stack.Screen component={AppStack} name="AppStack" />
        <Stack.Screen
          component={Evento}
          name="Evento"
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          component={Menu}
          name="Menu"
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          component={MudarSenha}
          name="MudarSenha"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
