<template>
    <div>
        <div class="jumbotron">
            <h3>Equipos</h3>
        </div>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Equipo</th>
                    <th>Detalle</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="equipo in equipos" :key="equipo.id">
                    <td>{{ equipo.id }}</td>
                    <td>{{ equipo.nombre }}</td>
                    <td>
                        <button class="btn btn-link" @click="verDetalle(equipo)">
                            Detalle
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import equipoApi from '../../services/equipo-api'
import tokenApi from "../../services/token-api"

const Equipos = {
    name: 'Equipos',
    props: {
        activeUser: Object
    },
    components: {
        
    },
	data: function() {
        return {
            equipos: [],
            loading: true,
            error: null,
      }
    },
    methods: {
        getEquipos() {
           tokenApi.getToken('admin', 'admin')
           .then(token => {
               console.log('token', token);
               
               equipoApi.getAll(token.data)
               .then(response => {
                   this.$log.debug("Data loaded: ", response)
                   this.equipos = response.data
                })
                .catch(error => {
                    this.$log.debug(error)
                    this.error = "Failed to load equipos"
                })
                .finally(() => this.loading = false)
            }) 
        },
        verDetalle(equipo) {
            this.$log.debug("Equipo: ", equipo)

            this.$router.push({
                name:'equipo-detalle'
                , params: {
                    equipoId: equipo.id
                }
            })
        }
    },
    mounted() {
        this.getEquipos()    
    }
}

export default Equipos
</script>

<style>

</style>