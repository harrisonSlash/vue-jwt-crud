<template>
    <div>
        
        <!-- Modal -->
        <div class="modal fade" id="barChartModal" tabindex="-1" role="dialog" aria-labelledby="barChartModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title" id="barChartModalLabel">Detalle de Estadísticas Barra</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="loading_estadisticas" class="alert alert-info" >
                            <h3 class="loading">Cargando estadisticas...</h3>
                        </div>
                        
                        <table v-else class="table table-bordered">
                            <caption>UEFA Champions League </caption>

                            <thead>
                                <tr class="table-secondary">
                                    <th>Jugados</th>
                                    <th>Ganados</th>
                                    <th>Empatados</th>
                                    <th>Perdidos</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{{ estadisticasBarra.jugados }}</td>
                                    <td>{{ estadisticasBarra.ganados }}</td>
                                    <td>{{ estadisticasBarra.empatados }}</td>
                                    <td>{{ estadisticasBarra.perdidos }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading_estadisticas" class="alert alert-info" >
            <h3 class="loading">Cargando estadisticas...</h3>
        </div>

        <div v-else>
            <highcharts :options="barChartOptions"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Ver detalle"
                        class="border rounded">
            </highcharts>

            <div id="container"></div>
        </div>
    </div>
</template>

<script>
import estadisticaEquipoapi from '../../services/estadistica-equipo-api';
import tokenApi from "../../services/token-api"
import {Chart} from 'highcharts-vue'
import $ from 'jquery'

const Estadistica = {
    name: 'Estadistica',
    props: ['idEquipo'],
    created: function () {
        this.timerEstadistcasBarra = setInterval(() => {
                this.$log.debug('Hay que actualizar')
                this.getEstadisticasEquipo()
            }, 15000)
    },
    beforeDestroy() {
        clearInterval(this.timerEstadistcasBarra)
    },
    components: {
        highcharts: Chart
    },
	data: function() {
        return {
            estadisticasBarra: {
                jugados: 5,
                ganados: 2,
                empatados: 2,
                perdidos: 1
            },
            loading_estadisticas: false,
            error: null,
            barChartOptions: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'bar',
                    events: {
                        click: (e) => {
                            this.openModalBarChart()
                        }
                    }/*, 
                    data: {
                        csvURL: 'https://demo-live-data.highcharts.com/time-data.csv',
                        enablePolling: true,
                        dataRefreshRate: 1500
                    }*/
                },
                title: {
                    text: 'Estadísticas Barra'
                },
                subtitle: {
                    text: 'Fase de Grupos en la UEFA Champions League'
                },
                xAxis: {
                    categories: ['Partidos'],
                    title: {
                        text: null
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    valueSuffix: ' partidos'
                },
                series: [
                    {
                        name: 'Ganados',
                        data: [0]
                    }, {
                        name: 'Empatados',
                        data: [2]
                    }, {
                        name: 'Perdidos',
                        data: [2]
                    }
                ]
            }
      }
    },
    methods: {
        getEstadisticasEquipo() {
           this.loading_estadisticas = true

           //Inicia btención de Token
           tokenApi.getToken('admin', 'admin')
           .then(token => {
               
               //Iicia obtención de estadisticas del equipo en champions
                estadisticaEquipoapi.getByEquipo(token.data, this.idEquipo, 1, 2019)
                .then(response => {
                    this.estadisticasBarra = response.data
                
                    this.updateCharSet()
                })
                .catch(error => {
                    this.$log.debug(error)
                    this.error = "Failed to load estadisticas de equipo"
                })
                .finally(() => this.loading_estadisticas = false)
                //termina obtención de estadisticas del equipo en champions

            })//Termina obtención de Token
        },

        updateCharSet() {
            this.$log.debug("Estatisticas loaded: ", this.estadisticasBarra)
            this.$log.debug("chartOptions: ", this.chartOptions)

            this.barChartOptions.series = [{
                name: 'Ganados',
                data: [this.estadisticasBarra.ganados]
            }, {
                name: 'Empatados',
                data: [this.estadisticasBarra.empatados]
            }, {
                name: 'Perdidos',
                data: [this.estadisticasBarra.perdidos]
            }]
        },

        openModalBarChart() {
            this.$log.debug('Hiciste click en la gáfica de Pie')
            
            $('#barChartModal').modal('show', true)
        }

    },
    mounted() {
        //this.getEstadisticasEquipo()
        //$(document).tooltip()
    }
}

export default Estadistica
</script>

<style>
   
</style>