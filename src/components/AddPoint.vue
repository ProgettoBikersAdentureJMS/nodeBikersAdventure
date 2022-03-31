<!-- aggiungere un punto alla mappa, di pericolo o di interesse-->
<template>
    <div>
        <button @click="enableSelect(1)">Punto di pericolo</button>
        <button @click="enableSelect(2)">Punto di interesse</button>

        <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 70vh">
            <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" 
                :projection="projection" />
            <ol-tile-layer>
                <ol-source-osm />
            </ol-tile-layer>

            <ol-vector-layer>
                <ol-source-vector>
                    <ol-interaction-draw v-if="selectWarningPoint" :type="drawType" @drawstart="drawStart($event)">
                    </ol-interaction-draw>
                </ol-source-vector>

                <ol-style>
                    <ol-style-icon :src="warning" :scale="0.1"></ol-style-icon>
                </ol-style>
            </ol-vector-layer>

            <ol-vector-layer>
                <ol-source-vector>
                    <ol-interaction-draw v-if="selectInterestPoint" :type="drawType" @drawstart="drawStart($event)">
                    </ol-interaction-draw>
                </ol-source-vector>

                <ol-style>
                    <ol-style-icon :src="interest" :scale="0.1"></ol-style-icon>
                </ol-style>
            </ol-vector-layer>

        </ol-map>
    </div>
</template>

<script>
    import warning from "../assets/warning.png"
    import interest from "../assets/interest.png"
    import ping from "../assets/ping.png"
    import { transform } from "ol/proj"

    export default {
        data() {
            return {
                center: [0, 0],
                projection: 'EPSG:4326',
                zoom: 16,
                rotation: 0,
                drawType: "Point",
                selectWarningPoint: false,
                selectInterestPoint: false,
                warningPoint: [0, 0],
                interestPoint: [0, 0],
                name: "",
                errorMsg: "",
                warning,
                interest,
                ping
            }
        },
        methods: {
            
            enableSelect(id) {
                switch (id) {
                    case 1:
                        this.selectWarningPoint = true
                        this.selectInterestPoint = false
                        break
                    case 2:
                        this.selectWarningPoint = false
                        this.selectInterestPoint = true
                        break
                }
            },
            drawStart(event) {
                // https://openlayers.org/en/latest/apidoc/module-ol_proj.html#.transform
                var coords = event.feature.getGeometry().getCoordinates()

                // Trasforma le coordinate in longitudine e latitudine
                var coordsLonLat = transform(coords, "EPSG:4326", "EPSG:4326")
                

                if (this.selectWarningPoint) {
                    this.warningPoint = coordsLonLat
                } else {
                    this.interestPoint = coordsLonLat
                }
            }
        },
        mounted() {
            navigator.geolocation.watchPosition( 
                position => {
                    this.center = [position.coords.longitude, position.coords.latitude]
                },
                error => { 
                    console.log(error.message)
                }
            )
        }
    }
</script>

<style>
    button {
        margin: 20px;
    }

    #error {
        color: red;
    }

</style>
