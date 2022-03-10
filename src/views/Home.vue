<template>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:90vh">
        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" 
        :projection="projection" />
        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>

        <ol-geolocation :projection="projection">
            <ol-vector-layer :zIndex="2">
                <ol-source-vector>
                    <ol-feature ref="positionFeature">
                        <ol-geom-point :coordinates="center"></ol-geom-point>
                        <ol-style>
                            <ol-style-icon :src="ping" :scale="1"></ol-style-icon>
                        </ol-style>
                    </ol-feature>
                </ol-source-vector>
            </ol-vector-layer>
        </ol-geolocation>

        <ol-vector-layer>
            <ol-source-vector>
                <ol-feature v-for="event, eventIndex in events" :key="eventIndex">
                    <ol-geom-point :coordinates="event.coordinates"></ol-geom-point>
                    <ol-style>
                        <ol-style-circle :radius="event.followers / 25">
                            <ol-style-fill :color="fillColor"></ol-style-fill>
                            <ol-style-stroke :color="strokeColor" :width="strokeWidth"></ol-style-stroke>
                        </ol-style-circle>
                    </ol-style>
                </ol-feature>
            </ol-source-vector>
        </ol-vector-layer>
    </ol-map>
</template>

<script>
    import ping from "../assets/ping.png" // Import image

    export default {
        data() {
            return {
                center: [0, 0],
                projection: 'EPSG:4326',
                zoom: 16,
                rotation: 0,
                radius: 5,
                strokeWidth: 4,
                strokeColor: "red",
                fillColor: "white",
                ping,
                events: [
                    {
                        id: 0,
                        coordinates: [9, 46.2],
                        followers: 150
                    },
                    {
                        id: 1,
                        coordinates: [9, 47],
                        followers: 300
                    }
                ]
            }
        },
        mounted() { // Called when page loaded all components
            navigator.geolocation.watchPosition( 
                position => {
                    this.center = [position.coords.longitude, position.coords.latitude]
                    console.log(this.center)
                },
                error => { 
                    console.log(error.message)
                }
            )
        }
    }
</script>