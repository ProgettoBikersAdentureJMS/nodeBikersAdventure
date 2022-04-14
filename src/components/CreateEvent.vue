<template>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 35vh">
        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" 
            :projection="projection" />
        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer v-if="selectPoint">
            <ol-source-vector :projection="projection">
                <ol-interaction-draw :type="drawType" @drawstart="drawStart($event)">
                </ol-interaction-draw>
            </ol-source-vector>

            <ol-style>
                <ol-style-icon :src="ping" :scale="1"></ol-style-icon>
            </ol-style>
        </ol-vector-layer>
    </ol-map>
    <div>
        <button @click="enableSelect">Punto di ritrovo</button>
        <div style="margin-left: 20%; margin-right: 20%">
            <div style="width: 50vh; float: left">
                <div id="title-content">
                    <h3>Titolo: <span class="required">*</span></h3>
                    <h3>Data/Ora inizio: <span class="required">*</span></h3>
                    <h3>Data/Ora termine: <span class="required">*</span></h3>
                    <h3>Data/Ora chiusura iscrizione: <span class="required">*</span></h3>
                    <h3>Privato:</h3>
                    <label class="switch">
                    <input type="checkbox" @change="switchPrivacy($event)">
                    <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div style="width: 50vh; float: right">
                <form id="create-event-data" @submit.prevent="createEvent">
                    <input type="text" v-model="title" required>
                    <input type="datetime-local" v-model="start" required>
                    <input type="datetime-local" v-model="end" required>
                    <input type="datetime-local" v-model="closeSubscriptionDate" required>
                    <div id="password" style="display: none">
                        <input type="password" placeholder="Password" v-model="password">
                        <input type="password" placeholder="Conferma password" v-model="confirmPassword">
                    </div>
                    <input type="submit" value="CONFERMA">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import ping from "../assets/ping.png"
    import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore"
    import { transform } from "ol/proj"

    export default {
        data() {
            return {
                center: [0, 0],
                projection: 'EPSG:4326',
                zoom: 16,
                rotation: 0,
                drawType: "Point",
                title: "",
                start: "",
                end: "",
                closeSubscriptionDate: "",
                password: "",
                confirmPassword: "",
                selectPoint: false,
                position: [0, 0],
                ping
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
            createEvent() {
                const path = "raduni/" + this.title
                const eventPath = doc(getFirestore(), path)
                const eventData = {
                    titolo: this.title,
                    inizio: this.start,
                    termine: this.end,
                    chiusura_iscrizione: this.closeSubscriptionDate,
                    password: this.password,
                    ritrovo: this.position
                }

                setDoc(eventPath, eventData)

                this.$router.push("/")
            },
            enableSelect() {
                this.selectPoint = true
            },
            drawStart(event) {
                // https://openlayers.org/en/latest/apidoc/module-ol_proj.html#.transform
                var coords = event.feature.getGeometry().getCoordinates()
                // Trasforma le coordinate in longitudine e latitudine
                this.position = transform(coords, "EPSG:4326", "EPSG:4326")
            }
        },
        mounted() { // Called when page loaded all components
            
            navigator.geolocation.watchPosition( 
                position => {
                    var currentUser = getAuth().currentUser
                    if(currentUser != null){

                        this.snapshotUsers.then(data => {
                            data.forEach(user1 => {
                                var user = user1.data()
                                if(currentUser.email === user.email){
                                    //aggiorna nel database
                                    const path = "utenti/" + user.username
                                    const document = doc(getFirestore(), path)
                                    const currentPosition = {
                                        posizione: [position.coords.longitude, position.coords.latitude]
                                    }
                                    updateDoc(document, currentPosition)
                                }
                            })
                        })
                        
                    }
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

<style>
    #create-event-data input {
        margin-bottom: 25px;
    }

    .required {
        color: red;
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