<template>
    <div>
        <div v-if="loading_equipo" class="alert alert-info">
            <h3 class="loading">Cargando equipo...</h3>
        </div>

        <div v-else>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link to="/home">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/equipos">Equipos</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">{{ equipo.nombre }} </li>
                </ol>
            </nav>

            <div class="row">
                <div class="col-md-6">
                    <EstadisticaPie :idEquipo="equipoId" />
                </div>
                <div class="col-md-6">
                    <EstadisticaBarra :idEquipo="equipoId" />
                </div>
            </div>

            <div class="row mt-2">
                <div class="col">
                    <GoogleMap />
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import equipoApi from '../../services/equipo-api'
import tokenApi from "../../services/token-api"
import EstadisticaPie from "../../components/equipo/EstadisticaPie"
import EstadisticaBarra from '../../components/equipo/EstadisticaBarra'
import GoogleMap from '../../components/equipo/GoogleMap'

const EquipoDetalle = {
    name: 'EquipoDetalle',
    props: {
        
    },
    components: {
        EstadisticaPie,
        EstadisticaBarra,
        GoogleMap
    },
	data: function() {
        return {
            equipoId: null,
            equipo: null,
            loading_equipo: true,
            error: null
      }
    },
    methods: {
        getDetalleEquipo() {
           
           //Inicia btención de Token
           tokenApi.getToken('admin', 'admin')
           .then(token => {
               
               //Inicia obtención de equipo
               equipoApi.getById(token.data, this.equipoId)
               .then(response => {
                   this.$log.debug("token loaded: ", response)
                   this.equipo = response.data
                })
                .catch(error => {
                    this.$log.debug(error)
                    this.error = "Failed to load equipo-detalle"
                })
                .finally(() => this.loading_equipo = false)
                //Termina obtención de equipo

            })//Termina obtención de Token
        }
    },
    mounted() {
        this.equipoId = this.$route.params.equipoId
        
        //Para detener el timer
        
        this.getDetalleEquipo()
    }
}

export default EquipoDetalle
</script>