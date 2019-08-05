<template>
    <div>
        <div id="container">

        </div>
        
        <highcharts :constructor-type="'mapChart'" :options="mapOptions"></highcharts>
    </div>
</template>



<script>
//import {Chart, Highcharts} from 'highcharts-vue'
import {Chart} from 'highcharts-vue'
import mapInit from 'highcharts/modules/map'
import Highcharts from 'highcharts'

mapInit(Highcharts)



const Mapa = {
    name: 'EquipoDetalle',
    props: {
        
    },
    components: {
        highcharts: Chart
    },
	data: function() {
        
        

        return {
            error: null,
            mapChart: 'mapChart',
            mapOptions: {
                chart: {
                    //map: Highcharts.maps["countries/mx/mx-all"] 
                    map: MX_ALL
                },
                title: {
                    text: 'Highmaps'
                }, 
                subtitle: {
                    text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World, Miller projection, medium resolution</a>'
                },
                legend: {
                    enabled: false
                },
                /*mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        alignTo: 'spacingBox'
                    }
                },
                colorAxis: {
                    min: 0
                },*/
                series: [{
                        type: 'mappoint',
                        name: 'Cities',
                        //mapData: Highcharts.maps['countries/mx/mx-all'],
                        mapData: MX_ALL,
                        data: [/*{
                            name: 'London',
                            lat: 51.507222,
                            lon: -0.1275
                        }, {
                            name: 'Birmingham',
                            lat: 52.483056,
                            lon: -1.893611
                        }, {
                            name: 'Leeds',
                            lat: 53.799722,
                            lon: -1.549167
                        }*/],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            formatter: function () {
                                if (this.point.value) {
                                    return this.point.name;
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '',
                            pointFormat: '{point.name}'
                        }	
                    }
                ]
            }
           
        }
    },
    mounted() {
        
    }
}

export default Mapa
</script>