import axios from 'axios'

const SERVER_URL = 'http://localhost:9000';
const TOKEN_KEY = 'auth-token';
const USER_AUTH_KEY = 'auth-user';
const ROLES_AUTH_KEY = 'auth-roles';
 
const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 2000  
});

export default {
    getToken: (user, pass) => retrieveToken(user, pass)
}

function retrieveToken(user, pass) {
    if( sessionStorage.getItem(TOKEN_KEY) ) {
        return new Promise(function(resolve, reject) {
            resolve({
                data: sessionStorage.getItem(TOKEN_KEY)
            });
        }); 
    } else {
        return generateToken(user, pass);
    }
}

function generateToken(user, pass) {
    return instance.get('/api/authenticate', {
        params: {username: user, password: pass}
        , transformResponse: [function (data) {
            const JSON_DATA = JSON.parse(data);
            
            setSessionTokenValues(JSON_DATA);

            return data ? JSON_DATA.Authorization : data;
        }]
    })
}

function setSessionTokenValues(data) {
    sessionStorage.setItem(TOKEN_KEY, data.Authorization);
    sessionStorage.setItem(USER_AUTH_KEY, data.User);
    sessionStorage.setItem(ROLES_AUTH_KEY, data.Roles);
}