/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useContext, useEffect} from 'react';

import {ApiContext} from '../context/ApiProvider';

export const EventoContext = createContext({});

export const EventoProvider = ({children}) => {
  const [eventos, setEvento] = useState([]);
  const {api} = useContext(ApiContext);

  //console.log(api);

  useEffect(() => {
    if (api) {
      getEventos();
    }
  }, [api]);

  const getEventos = async () => {
    try {
      const response = await api.get('/eventos');
      //console.log('Dados buscados via API');
      //console.log(response.data);
      //console.log(response.data.documents);
      let data = [];
      response.data.documents?.map(d => {
        let k = d.name.split(
          'projects/jour-fc5db/databases/(default)/documents/eventos/',
        );
        //console.log(k[1]);
        // console.log(d.fields.latitude.stringValue);
        // console.log(d.fields.longitude.stringValue);
        data.push({
          nome: d.fields.nome.stringValue,
          descricao: d.fields.descricao.stringValue,
          data: d.fields.data.stringValue,
          // latitude: d.fields.latitude.doubleValue,
          // longitude: d.fields.longitude.doubleValue,
          uid: k[1],
        });
      });
      data.sort((a, b) => {
        if (a.nome.toUpperCase() < b.nome.toUpperCase()) {
          return -1;
        }
        if (a.nome.toUpperCase() > b.nome.toUpperCase()) {
          return 1;
        }
        // nomes iguais
        return 0;
      });
      setEvento(data);
    } catch (response) {
      console.error('Erro em getEventos via API:');
      console.error(response);
    }
  };

  const saveEvento = async val => {
    try {
      await api.post('/eventos/', {
        fields: {
          nome: {stringValue: val.nome},
          descricao: {stringValue: val.descricao},
          data: {stringValue: val.data},
          // hora: {stringValue: val.hora},
          // latitude: {doubleValue: val.latitude},
          // longitude: {doubleValue: val.longitude},
        },
      });
      getEventos();
      return true;
    } catch (response) {
      console.error('Erro em saveEvento via API: ' + response);
      return false;
    }
  };

  const updateEvento = async val => {
    try {
      console.log('val', val);
      await api.patch('/eventos/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
          descricao: {stringValue: val.descricao},
          data: {stringValue: val.data},
          // latitude: {doubleValue: val.latitude},
          // longitude: {doubleValue: val.longitude},
        },
      });
      getEventos();
      return true;
    } catch (response) {
      console.error('Erro em updateEvento via API: ' + response);
      return false;
    }
  };

  const deleteEvento = async val => {
    try {
      await api.delete('/eventos/' + val);
      getEventos();
      return true;
    } catch (response) {
      console.error('Erro em deleteEvento via API: ' + response);
      return false;
    }
  };

  return (
    <EventoContext.Provider
      value={{
        eventos,
        saveEvento,
        updateEvento,
        deleteEvento,
      }}>
      {children}
    </EventoContext.Provider>
  );
};
