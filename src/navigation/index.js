import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import { EventoProvider } from '../context/EventoProvider';
import Navigator from './Navigator';
import {ApiProvider} from '../context/ApiProvider';
// import {ResenhaProvider} from '../context/ResenhaProvider';
import {UserProvider} from '../context/UserProvider';
import { NotificationsProvider } from '../context/NotificationsProvider';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {Colors, COLORS} from '../assets/colors';
import { AuthenticationProvider } from '../context/Authentication';


const theme = createTheme({
  lightColors: {
    primary: Colors.primary,
    primaryDark: Colors.primaryDark, //esta cor extende a paleta do rneui
    secondary: Colors.accent,
    accentSecundary: Colors.accentSecundary, //esta cor extende a paleta do rneui
    background: Colors.white,
    white: Colors.white,
    error: Colors.error,
    transparent: Colors.transparent, //esta cor extende a paleta do rneui
  },
  darkColors: {
    primary: Colors.white,
    primaryDark: Colors.black, //esta cor extende a paleta do rneui
    secondary: Colors.accent,
    accentSecundary: Colors.accentSecundary, //esta cor extende a paleta do rneui
    background: Colors.black,
    error: Colors.error,
    loading: Colors.primaryDark,
    transparent: Colors.transparent, //esta cor extende a paleta do rneui
  },
  mode: 'light',
  components: {
    Button: {
      containerStyle: {
        width: '85%',
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10,
        backgroundColor: Colors.accent,
        borderRadius: 5,
      },
      buttonStyle: {
        height: 48,
        backgroundColor: Colors.accent,
        borderRadius: 3,
      },
      titleStyle: {color: Colors.white},
    },
    ButtonGroup: {
      containerStyle: {
        height: 35,
        marginTop: 20,
        marginBottom: 20,
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
      },
      buttonStyle: {
        height: 32,
      },
      textStyle: {color: Colors.primary},
      innerBorderStyle: {color: Colors.primary},
    },
    Image: {
      containerStyle: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 120 / 2,
        backgroundColor: Colors.transparent,
      },
    },
    Input: {
      inputContainerStyle: {
        borderBottomColor: Colors.grey,
      },
    },
  },
});

export default function Providers() {
  return (
    <ThemeProvider theme={theme}>
      <AuthUserProvider>
        <AuthenticationProvider>
          <NotificationsProvider>
            <ApiProvider>
              <UserProvider>
                <EventoProvider>
                    <Navigator />
                </EventoProvider>
              </UserProvider>
            </ApiProvider>
          </NotificationsProvider>
        </AuthenticationProvider>
      </AuthUserProvider>
    </ThemeProvider>
  );
}
