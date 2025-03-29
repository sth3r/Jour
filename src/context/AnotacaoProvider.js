import React, {createContext, useEffect, useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthenticationContext} from './Authentication';

export const AnotacaoContext = createContext({});

export const AnotacaoProvider = ({children}) => {
  const [anotacoes, setAnotacoes] = useState([]);
  const {user, getUser} = useContext(AuthenticationContext);

  useEffect(() => {
    const listener = firestore()
      .collection('anotacoes')
      .orderBy('titulo')
      .onSnapshot(snapShot => {
        //console.log(snapShot);
        //console.log(snapShot._docs);
        if (snapShot) {
          let data = [];
          snapShot.forEach(doc => {
            data.push({
              uid: doc.id,
              titulo: doc.data().titulo,
              conteudo: doc.data().conteudo,
              fonte: doc.data().fonte,
              cor: doc.data().cor,
            });
          });
          setAnotacoes(data);
        }
      });

    return () => {
      listener();
    };
  }, []);

  const save = async (anotacao, urlDevice) => {
    try {
      await firestore().collection('anotacoes').doc(anotacao.uid).set(
        {
          titulo: anotacao.titulo,
          conteudo: anotacao.conteudo,
          fonte: anotacao.fonte,
          cor: anotacao.cor,
        },
        {merge: true},
      );
      return true;
    } catch (e) {
      console.error('AnotacaoProvider, salvar: ' + e);
      return false;
    }
  };

  const del = async uid => {
    try {
      await firestore().collection('anotacoes').doc(uid).delete();
      return true;
    } catch (e) {
      console.error('AnotacaoProvider, del: ', e);
      return false;
    }
  };

  return (
    <AnotacaoContext.Provider value={{anotacoes, save, del}}>
      {children}
    </AnotacaoContext.Provider>
  );
};
