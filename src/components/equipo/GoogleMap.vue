<template>
    <div>
        
        <div id="map" class="border rounded"></div>

    </div>
</template>

<script>
const GoogleMap = {
    name: 'GoogleMap',
    created: function () {
        
    },
    beforeDestroy() {
        
    },
    components: {
        
    },
	data: function() {
        return {
            error: null,
            sakespeare21: {lat: 19.426639, lng: -99.176445},
            mapMarks: [
                {lat: 19.426639, lng: -99.176445, title: 'Shakespeare 21'}//shakespeare21
                , {lat: 19.422543, lng:-99.175111, title: 'Torre Bancomer'}//torreBancomer
                , {lat: 19.429172, lng: -99.162089, title: 'Reforma 222'}//reforma222
            ]
      }
    },
    methods: {
        initMap() {
            var map = new google.maps.Map(
                document.getElementById('map'), 
                {
                    zoom: 15, 
                    center: {lat: 19.426639, lng: -99.176445},
                    mapTypeId: 'roadmap'
                }
            )

            for(var i=0; i<this.mapMarks.length; i++) {
                new google.maps.Marker({position: this.mapMarks[i], map: map, title: this.mapMarks[i].title})
            }
        }
    },
    mounted() {
        this.initMap()
    }
}

export default GoogleMap
</script>

<style>
    /* Always set the map height explicitly to define the size of the div
    * element that contains the map. */
    #map {
        height: 400px
    }
</style>