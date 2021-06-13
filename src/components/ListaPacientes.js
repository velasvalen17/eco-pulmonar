import React, { useEffect, useState } from "react";
import {
  useDataQuery,
  useDataEngine,
  useDataMutation,
} from "@dhis2/app-runtime";

/**
 * Este componente devuelve una lista de TEIs que no tienen vídeos
 * guardados en sus formularios.
 *
 * 1.) Pide la lista de TEIs existentes en el servidor
 * 2.) Por cada TEI en la lista, realiza una petición al servidor para
 *     para ver si tiene vídeos en sus formularios.
 * 3.) Genera una lista de TEIs, sin vídeos en sus formularios.
 * 4.) Por cada TEI sin vídeo en la lista, llama a PedirVideos (ORTHANC)
 *
 */

const TEI_QUERY = {
  //Pide todos los TEIs del sistema asociados a una OU
  teis: {
    resource: "trackedEntityInstances.json",
    params: {
      paging: false,
      ou: "uDNvnDC9DHj",
      ouMode: "DESCENDANTS",
      fields: "trackedEntityInstance",
    },
  },
};

const ListaPacientes = () => {
  const [teiList, setTeiList] = useState({});
  const { loading, error, data } = useDataQuery(TEI_QUERY);

  useEffect(() => {
    if (data) {
      console.log(data);
      setTeiList(data.teis.trackedEntityInstances)
    }
  }, [data]);

  useEffect(()=>{
    if (teiList.length != 0){
      console.log(teiList)
    }
  }, [teiList])

  return (
    <>
      {loading && <span>...</span>}
      {error && <p>{`ERROR: ${error.message}`}</p>}
      {data && (
        <>
          <h1>Lista de ids de pacientes</h1>
          <pre>
            {data.teis.trackedEntityInstances.map((teiList) => (
              <p key={teiList.trackedEntityInstance}>{teiList.trackedEntityInstance}</p>
            ))}
          </pre>
        </>
      )}
    </>
  );
};

export default ListaPacientes;
