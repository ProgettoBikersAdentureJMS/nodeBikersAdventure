<template>
    <button @click="enableSelect(1)">Punto di partenza</button>
    <button @click="enableSelect(2)">Punto di arrivo</button>
    <button @click="enableSelect(3)">Tappe intermedie</button>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 35vh">
        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" 
            :projection="projection" />
        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer>
            <ol-source-vector>
                <ol-interaction-draw :type="drawType" @drawstart="drawStart($event)">

                </ol-interaction-draw>
            </ol-source-vector>

            <ol-style>
                <ol-style-icon v-if="selectPointStart" :src="ping" :scale="1"></ol-style-icon>
                <ol-style-icon v-if="selectPointArrive" :src="ping" :scale="1"></ol-style-icon>
                <ol-style-icon v-if="selectPointMiddle" :src="ping" :scale="1"></ol-style-icon>
            </ol-style>
        </ol-vector-layer>
    </ol-map>
    <div>
        <h3>Privato:</h3>
        <label class="switch">
            <input type="checkbox" @change="switchPrivacy($event)">
            <span class="slider round"></span>
        </label>
    </div>
    <div>
        <div id="password" style="display: none">
            <input type="password" placeholder="Password" v-model="password">
            <input type="password" placeholder="Conferma password" v-model="confirmPassword">
        </div>
    </div>
</template>

<script>
    

    export default {
        data() {
            return {
                center: [0, 0],
                projection: 'EPSG:4326',
                zoom: 16,
                rotation: 0,
                drawType: "Point",
                selectPointStart: false,
                selectPointArrive: false,
                selectedPointMiddle: false,
                positionStart: [0, 0],
                positionArrive: [0, 0],
                middlePositions: []
            }
        },
        methods: {
            switchPrivacy(event) {
                if (event.target.checked) {
                    document.getElementById("password").style.display = ""
                } else {
                    document.getElementById("password").style.display = "none"
                }
            },
            /*enableSelect(id) {
                switch (id) {
                    case 1:
                        this.selectPointStart = true
                        this.selectPointArrive = false
                        this.selectPointMiddle = false
                        break
                    case 2:
                        this.selectPointStart = false
                        this.selectPointArrive = true
                        this.selectPointMiddle = false
                        break
                    case 3:
                        this.selectPointStart = false
                        this.selectPointArrive = false
                        this.selectPointMiddle = true
                        break
                }
            },
            drawStart(event) {
                // https://openlayers.org/en/latest/apidoc/module-ol_proj.html#.transform
                var coords = event.feature.getGeometry().getCoordinates()

                // Trasforma le coordinate in longitudine e latitudine
                var coordsLonLat = transform(coords, "EPSG:4326", "EPSG:4326")
                
                if (this.selectPointStart) {
                    this.positionStart = coordsLonLat
                } else if (this.selectPointArrive) {
                    this.positionArrive = coordsLonLat
                } else {
                    this.middlePositions.push(coordsLonLat)
                }
            }*/
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

    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: orange;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px orange;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>
