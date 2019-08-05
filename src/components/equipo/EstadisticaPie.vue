<template>
    <div>
        
        <!-- Modal -->
        <div class="modal fade" id="pieChartModal" tabindex="-1" role="dialog" aria-labelledby="pieChartModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title" id="pieChartModalLabel">Detalle de Estadísticas</h5>
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
                                    <td>{{ estadisticas.jugados }}</td>
                                    <td>{{ estadisticas.ganados }}</td>
                                    <td>{{ estadisticas.empatados }}</td>
                                    <td>{{ estadisticas.perdidos }}</td>
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
            
                    <highcharts :options="chartOptions"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Ver detalle"
                                class="border rounded">
                    </highcharts>
    
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
        this.timerEstadistcas = setInterval(() => {
                this.$log.debug('Hay que actualizar')
                this.getEstadisticasEquipo()
            }, 15000)
    },
    beforeDestroy() {
        clearInterval(this.timerEstadistcas)
    },
    components: {
        highcharts: Chart
    },
	data: function() {
        return {
            estadisticas: {
                jugados: 5,
                ganados: 2,
                empatados: 2,
                perdidos: 1
            },
            loading_estadisticas: false,
            error: null,
            chartOptions: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    events: {
                        click: (e) => {
                            this.openModalPieChart()
                        }
                    }
                },
                title: {
                    text: 'Estadísticas Pie'
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.1f}%</b>'
                },
                series: [{
                    name: 'Estadistica del equipo',
                    colorByPoint: true,
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            }
                        }
                    },
                    data: [{
                            name: 'Ganados',
                            y: 10.00,
                        }, {
                            name: 'Empatados',
                            y: 10
                        }, {
                            name: 'Perdidos',
                            y: 80
                        }]
                }]
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
                    this.estadisticas = response.data
                
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
            this.$log.debug("Estatisticas loaded: ", this.estadisticas)
            this.$log.debug("chartOptions: ", this.chartOptions)

            this.chartOptions.series = [{
                data: [{
                        name: 'Ganados',
                        y: (this.estadisticas.ganados * 100 / this.estadisticas.jugados),
                    }, {
                        name: 'Empatados',
                        y: (this.estadisticas.empatados * 100 / this.estadisticas.jugados)
                    }, {
                        name: 'Perdidos',
                        y: (this.estadisticas.perdidos * 100 / this.estadisticas.jugados)
                    }]
            }]
        },

        openModalPieChart() {
            this.$log.debug('Hiciste click en la gáfica de Pie')
            
            $('#pieChartModal').modal('show', true)
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