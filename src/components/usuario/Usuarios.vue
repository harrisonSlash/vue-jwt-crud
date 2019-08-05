<template>
    <div>
        <div class="jumbotron">
            <h3>Usuarios</h3>
        </div>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Nombre completo</th>
                    <th>Edad</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.usuario }}</td>
                    <td>{{ usuario.nombreCompleto }}</td>
                    <td>{{ usuario.edad }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import usuarioApi from '../../services/usuario-api'
import tokenApi from "../../services/token-api"


const Usuarios = {
    name: 'Usuarios',
    props: {
        activeUser: Object
    },
    components: {
        
    },
	data: function() {
        return {
            usuarios: [],
            loading: true,
            error: null,
      }
    },
    methods: {
        getUsuarios() {
           tokenApi.getToken('admin', 'admin')
           .then(token => {
               this.$log.debug("Loaded Token: ", token)
               
               usuarioApi.getAll(token.data)
               .then(response => {
                   this.$log.debug("Data loaded: ", response)
                   this.usuarios = response.data
                })
                .catch(error => {
                    this.$log.debug(error)
                    this.error = "Failed to load usuarios"
                })
                .finally(() => this.loading = false)
            }) 
        }
    },
    mounted() {
        this.getUsuarios()
        
    }
}

export default Usuarios
</script>

<style>

</style>