import axios from 'axios'

const SERVER_URL = 'http://localhost:9000';
const ESTADISTICAS_EQUIPO_ENDPOINT = 'estadisticas/search/findByEquipoTorneoIdEquipoIdAndEquipoTorneoIdTorneoIdAndEquipoTorneoIdAnnio'
 
const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 1000  
});

export default {
    //GetByEquipoTorneoAnnio
    getByEquipo: (token, idEquipo, idTorneo, annio) => instance.get(ESTADISTICAS_EQUIPO_ENDPOINT, {
        params: {
            equipoId: idEquipo
            , torneoId: idTorneo
            , annio: annio
        },
        transformResponse: [function (data) {
            return data ? JSON.parse(data) : data;
        }],
        headers: {'Authorization': token}
    })
}