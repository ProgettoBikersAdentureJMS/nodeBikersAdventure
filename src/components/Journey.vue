<template>
    <div>
        <ListModels @getTemplate="getTemplate" />
        <div style="margin-left: 20%; margin-right: 20%">
            <div style="width: 50vh; float: left">
                <div id="title-content">
                    <h3>Titolo: <span class="required">*</span></h3>
                    <h3>Data/Ora partenza: <span class="required">*</span></h3>
                    <h3>Data/Ora arrivo: <span class="required">*</span></h3>
                    <h3>Data/Ora chiusura iscrizione: <span class="required">*</span></h3>
                    <h3>Privato:</h3>
                    <label class="switch">
                    <input type="checkbox" @change="switchPrivacy($event)">
                    <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div style="width: 50vh; float: right">
                <form id="create-event-data" @submit.prevent="organizeJourney">
                    <input type="text" v-model="title" required>
                    <input type="datetime-local" v-model="start" required>
                    <input type="datetime-local" v-model="end" required>
                    <input type="datetime-local" v-model="closeSubscriptionDate" required>
                    <div id="passwordJourney" style="display: none">
                        <input type="password" placeholder="Password" v-model="password">
                        <input type="password" placeholder="Conferma password" v-model="confirmPassword">
                    </div>
                    <p id="error" v-if="errorMsg">{{ errorMsg }}</p>
                    <input type="submit" value="CONFERMA">
                </form>
            </div>
        </div>
        <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 35vh">
            <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" 
                :projection="projection" />
            <ol-tile-layer>
                <ol-source-osm />
            </ol-tile-layer>

            <ol-vector-layer>
                <ol-source-vector>
                    <ol-feature>
                        <ol-geom-point :coordinates="positionStart"></ol-geom-point>
                    </ol-feature>
                </ol-source-vector>

                <ol-style>
                    <ol-style-icon :src="start" :scale="0.1"></ol-style-icon>
                </ol-style>
            </ol-vector-layer>

            <ol-vector-layer>
                <ol-source-vector>
                    <ol-feature>
                        <ol-geom-point :coordinates="positionArrive"></ol-geom-point>
                    </ol-feature>
                </ol-source-vector>

                <ol-style>
                    <ol-style-icon :src="arrive" :scale="0.1"></ol-style-icon>
                </ol-style>
            </ol-vector-layer>

            <ol-vector-layer v-for="middlePoint,itemIndex in middlePositions" :key="itemIndex">
                <ol-source-vector>
                    <ol-feature>
                        <ol-geom-point :coordinates="middlePoint"></ol-geom-point>
                    </ol-feature>
                </ol-source-vector>

                <ol-style>
                    <ol-style-icon :src="ping" :scale="1"></ol-style-icon>
                </ol-style>
            </ol-vector-layer>
        </ol-map>
    </div>
</template>

<script>
    import { getFirestore, doc, setDoc, getDocs, collection, updateDoc} from "firebase/firestore"
    import { transform } from "ol/proj"
    import { Polyline } from "ol/format"
    import { Feature } from "ol"
    import ListModels from "./ListModels.vue"
    import start from "../assets/start.png"
    import arrive from "../assets/arrive.png"
    import ping from "../assets/ping.png"

    export default {
        components: {
            ListModels
        },
        data() {
            return {
                center: [0, 0],
                projection: 'EPSG:4326',
                zoom: 16,
                rotation: 0,
                drawType: "Point",
                positionStart: [0, 0],
                positionArrive: [0, 0],
                middlePositions: [],
                title: "",
                start: "",
                end: "",
                closeSubscriptionDate: "",
                password: "",
                confirmPassword: "",
                snapshotTemplates: getDocs(collection(getFirestore(), "modelli")),
                templateData: [],
                participants: [],
                errorMsg: "",
                templateId: null,
                start,
                arrive,
                ping
            }
        },
        methods: {
            getTemplate(value) {
                this.templateId = value

                this.snapshotTemplates.then(data => {
                    data.forEach(model => {
                        // get data
                        var modelData = model.data()

                        if (modelData.nome == this.templateId) {
                            // set starting point and center
                            this.positionStart = modelData.partenza
                            this.center = this.positionStart

                            console.log(modelData.partenza)
                            console.log(this.positionStart)

                            // set arrive point
                            this.positionArrive = modelData.arrivo
                            
                            // set middle points
                            modelData.intermedi.forEach(middle => {
                                console.log(middle)
                                this.middlePositions.push([middle[0], middle[1]])
                                console.log(this.middlePositions)
                            })

                            // create route to follow
                            var route = "http://router.project-osrm.org/route/v1/driving/"
                            route += this.positionStart + ";"

                            //console.log(this.middlePositions)

                            this.middlePositions.forEach(middle => {
                                route += middle.toString() + ";"
                            })
                            route += this.positionArrive
                            route += "?steps=true"

                            //console.log(route)

                            // get route to follow
                            /*fetch()
                                // Legge il polyline: https://jsfiddle.net/jonataswalker/079xha47/        
                                .then(response => response.json())
                                .then(data => {
                                    var format = new Polyline()
                                    var line = format.readGeometry(data.routes[0].geometry, {
                                        dataProjection: 'EPSG:4326',
                                        featureProjection: 'EPSG:900913'
                                    })
                                    
                                    var feature = new Feature(line)
                                    var flatCoordinates = feature.getGeometry().getCoordinates()

                                    flatCoordinates.forEach(flat => {
                                        this.middlePositions.push(this.meters2degress(flat[0], flat[1]))
                                    })
                                })
                                .catch(error => {
                                    console.log(error)
                                })*/

                            return
                        }
                    })
                })
            },
            meters2degress(x,y) {
                var lon = x *  180 / 20037508.34 ;
                //thanks magichim @ github for the correction
                var lat = Math.atan(Math.exp(y * Math.PI / 20037508.34)) * 360 / Math.PI - 90; 
                return [lon, lat]
            },
            switchPrivacy(event) {
                if (event.target.checked) {
                    document.getElementById("passwordJourney").style.display = ""
                } else {
                    document.getElementById("passwordJourney").style.display = "none"
                }
            },
            organizeJourney() {
                //controllo vari errori
                //se non sono stati inseriti nome o descrizione
                if(this.title === ""){
                    this.errorMsg = "Inserire un titolo per il tragitto"
                    return
                //se le date non sono state inserite
                }else if(this.start === "" || this.end === "" || this.closeSubscriptionDate === ""){
                    this.errorMsg = "Se il pericolo è temporaneo, è obbligatorio inserire due date valide"
                    return
                //se la fine è prima dell'inizio    
                }else if(this.start > this.end){
                    this.errorMsg = "La data di fine deve essere maggiore di quella di inizio"
                    return
                //Se l'inizio è prima della data corrente
                }else if((new Date()) > new Date(this.end)){
                    this.errorMsg = "La data di inizio non può essere già passata"
                    return
                //Se la chiusura è prima della data corrente
                }else if((new Date()) > new Date(this.closeSubscriptionDate)){
                    this.errorMsg = "La data di chiusura delle iscrizioni non può essere già passata"
                    return
                //Se la fine è prima della data corrente
                }else if((new Date()) > new Date(this.end)){
                    this.errorMsg = "La data di fine non può essere già passata"
                    return
                }
                const path = "tragitti/" + this.title
                const journeyPath = doc(getFirestore(), path)
                const journeyData = {
                    titolo: this.title,
                    partenza: this.start,
                    arrivo: this.end,
                    chiusura_iscrizione: this.closeSubscriptionDate,
                    password: this.password,
                    modello_Id: this.templateId,
                    partecipanti: ["bansam"]
                }

                setDoc(journeyPath, journeyData)

                this.$router.push("/")
            }
        }
    }
</script>