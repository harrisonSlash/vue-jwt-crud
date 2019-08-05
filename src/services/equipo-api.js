import axios from 'axios'

const SERVER_URL = 'http://localhost:9000';
 
const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 1000  
});

export default {
    //GetAll
    getAll: (token) => instance.get('equipos', {
        transformResponse: [function (data) {
            return data ? JSON.parse(data)._embedded.equipos : data;
        }],
        headers: {'Authorization': token}
    }),
    //GetById
    getById: (token, idEquipo) => instance.get('equipos/' + idEquipo, {
        transformResponse: [function (data) {
            //return data ? JSON.parse(data)._embedded : data;
            return data ? JSON.parse(data) : data;
        }],
        headers: {'Authorization': token}
    })
}