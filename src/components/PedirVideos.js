import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
const PedirVideos = () => {
  const [respuestaAPI, setRespuestaAPI] = useState({ respuesta: 'KO' });
 
  useEffect(() => {
    const consultaAPI = async () => {
      const consulta = await axios.get("http://ecopulmonar.dhis2.ehas.org:8042/patients", {
        auth: {
          username: 'ecopulmonar',
          password: 'ecopulmonar'
        }
      });
      setRespuestaAPI(consulta);
    };
 
    consultaAPI();
  }, []);

  useEffect(() => {
    console.log(respuestaAPI)
  }, [respuestaAPI])
 
  const MostrarRespuesta = () => {
    return Object.keys(respuestaAPI).map(key => {
      return (
        <div key={key}>
          {key}: {JSON.stringify(respuestaAPI[key])}
        </div>
      );
    });
  };
 
  return (
    <div>
      <MostrarRespuesta />
    </div>
  );
};
 
export default PedirVideos;
