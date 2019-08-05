import axios from 'axios'

const SERVER_URL = 'http://localhost:9000';
 
const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 1000  
});

export default {
    // (C)reate
    //createNew: (text, completed) => instance.post('todos', {title: text, completed: completed}),
    createNew: (text, completed) => instance.post('todos', {title: text, completed: completed}, 
        {
            headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZWN1cmUtYXBpIiwiYXVkIjoic2VjdXJlLWFwcCIsInN1YiI6ImFkbWluIiwiZXhwIjoxNTYxMDUwMDk5LCJyb2wiOlsiUk9MRV9MSUdBX1NFTF9BTEwiLCJST0xFX0VRVUlfU0VMX0FMTCJdfQ.xVcoS-gvty-7gV6z7iiIFJpojjLoEbudRz0gcUt5kb1Z1CeXYvbgO_0DK1719u1uJ4uMRi5piCaLPbvRNGWqTg'}
        }
    ),
    // (R)ead
    getAll: (token) => instance.get('usuarios', {
        transformResponse: [function (data) {
            return data ? JSON.parse(data)._embedded.usuarios : data;
        }],
        headers: {'Authorization': token}
    }),
    // (U)pdate
    updateForId: (id, text, completed) => instance.put('todos/'+id, {title: text, completed: completed},
        {
            headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZWN1cmUtYXBpIiwiYXVkIjoic2VjdXJlLWFwcCIsInN1YiI6ImFkbWluIiwiZXhwIjoxNTYxMDUwMDk5LCJyb2wiOlsiUk9MRV9MSUdBX1NFTF9BTEwiLCJST0xFX0VRVUlfU0VMX0FMTCJdfQ.xVcoS-gvty-7gV6z7iiIFJpojjLoEbudRz0gcUt5kb1Z1CeXYvbgO_0DK1719u1uJ4uMRi5piCaLPbvRNGWqTg'}
        }
    ),
    // (D)elete
    removeForId: (id) => instance.delete('todos/'+id, {headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZWN1cmUtYXBpIiwiYXVkIjoic2VjdXJlLWFwcCIsInN1YiI6ImFkbWluIiwiZXhwIjoxNTYxMDUwMDk5LCJyb2wiOlsiUk9MRV9MSUdBX1NFTF9BTEwiLCJST0xFX0VRVUlfU0VMX0FMTCJdfQ.xVcoS-gvty-7gV6z7iiIFJpojjLoEbudRz0gcUt5kb1Z1CeXYvbgO_0DK1719u1uJ4uMRi5piCaLPbvRNGWqTg'}})  
}