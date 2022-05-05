<template>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:90vh">
        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" 
        :projection="projection" />
        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>

        <!-- Posizione attuale dell'utente -->
        <ol-geolocation :projection="projection">
            <ol-vector-layer :zIndex="2">
                <ol-source-vector>
                    <ol-feature ref="positionFeature">
                        <ol-geom-point :coordinates="center"></ol-geom-point>
                    </ol-feature>

                    <ol-style>
                        <ol-style-icon :src="ping" :scale="1"></ol-style-icon>
                    </ol-style>
                </ol-source-vector>
            </ol-vector-layer>
        </ol-geolocation>

        <!-- Punti di pericolo -->
        <ol-vector-layer>
            <ol-source-vector>
                <ol-feature v-for="warning, warningIndex in warningPoints" :key="warningIndex">
                    <ol-geom-point :coordinates="warning.punto_pericolo"></ol-geom-point>
                </ol-feature>

                <ol-style>
                    <ol-style-icon :src="warning" :scale="0.1"></ol-style-icon>
                </ol-style>
            </ol-source-vector>
        </ol-vector-layer>

        <!-- Punti di interesse -->
        <ol-vector-layer>
            <ol-source-vector>
                <ol-feature v-for="interest, interestIndex in interestPoints" :key="interestIndex">
                    <ol-geom-point :coordinates="interest.punto_interesse"></ol-geom-point>
                </ol-feature>

                <ol-style>
                    <ol-style-icon :src="interest" :scale="0.1"></ol-style-icon>
                </ol-style>
            </ol-source-vector>
        </ol-vector-layer>

        <!-- Punti dove si trovano i partecipanti -->
        <ol-vector-layer>
            <ol-source-vector>
                <ol-feature v-for="partecipant, partecipantIndex in partecipants" :key="partecipantIndex">
                    <ol-geom-point :coordinates="partecipant.posizione"></ol-geom-point>
                </ol-feature>

                <ol-style>
                    <ol-style-icon :src="ping" :scale="1"></ol-style-icon>
                </ol-style>
            </ol-source-vector>
        </ol-vector-layer>

        <!-- Punto di partenza del tragitto -->
        <ol-vector-layer v-if="isJourney">
            <ol-source-vector>
                <ol-feature>
                    <ol-geom-point :coordinates="startPositionJourney"></ol-geom-point>
                </ol-feature>

                <ol-style>
                    <ol-style-icon :src="start" :scale="0.1"></ol-style-icon>
                </ol-style>
            </ol-source-vector>
        </ol-vector-layer>

        <!-- Punto di arrivo del tragitto -->
        <ol-vector-layer v-if="isJourney">
            <ol-source-vector>
                <ol-feature>
                    <ol-geom-point :coordinates="arrivePositionJourney"></ol-geom-point>
                </ol-feature>

                <ol-style>
                    <ol-style-icon :src="arrive" :scale="0.1"></ol-style-icon>
                </ol-style>
            </ol-source-vector>
        </ol-vector-layer>

        <!-- Punti intermedi del tragitto -->
        <ol-vector-layer v-if="isJourney">
            <ol-source-vector>
                <ol-feature v-for="middlePoint, middleIndex in middlePositions" :key="middleIndex">
                    <ol-geom-point :coordinates="middlePoint"></ol-geom-point>
                </ol-feature>

                <ol-style>
                    <ol-style-icon :src="dot" :scale="0.2"></ol-style-icon>
                </ol-style>
            </ol-source-vector>
        </ol-vector-layer>
    </ol-map>
    <h1>Partecipanti</h1>
    <div>
        <table>
            <tr>
                <th>Nome</th>
            </tr>
            <tr>
                <SubscriptionPartecipants :partecipants="partecipantsName" />
            </tr>    
        </table>
    </div>
</template>

<script>
    import ping from "../assets/ping.png"
    import start from "../assets/start.png"
    import arrive from "../assets/arrive.png"
    import warning from "../assets/warning.png"
    import interest from "../assets/interest.png"
    import dot from "../assets/dot.png"
    import SubscriptionPartecipants from "./SubscriptionPartecipants.vue"
    import { getFirestore, collection, getDocs, doc, updateDoc} from "firebase/firestore"
    import { getAuth } from "firebase/auth"
    import { Polyline } from "ol/format"
    import { Feature } from "ol"

    export default {
        components: {
            SubscriptionPartecipants
        },
        props: {
            subscriptionDoc: {
                type: Object,
                default: null
            },
            isJourney: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                snapshotUsers: getDocs(collection(getFirestore(), "utenti")),
                snapshotWarningPoints: getDocs(collection(getFirestore(), "puntiPericolo")),
                snapshotInterestPoints: getDocs(collection(getFirestore(), "puntiInteresse")),
                snapshotTemplates: getDocs(collection(getFirestore(), "modelli")),
                warningPoints: [],
                interestPoints: [],
                partecipants: [],
                partecipantsName: [],
                startPositionJourney: [0, 0],
                arrivePositionJourney: [0, 0],
                middlePoints:[],
                middlePositions: [],
                center: [0, 0],
                projection: 'EPSG:4326',
                zoom: 16,
                rotation: 0,
                radius: 5,
                strokeWidth: 4,
                strokeColor: "blue",
                strokeColor2: "red",
                strokeColor3: "green",
                fillColor: "white",
                ping,
                start,
                arrive,
                warning,
                interest,
                dot
            }
        },
        methods: {
            /**
             * Questo metodo trasforma le coordinte flat in coordinate 
             * composte da latitudine e longitudine.
             */
            meters2degress(x,y) {
                var lon = x *  180 / 20037508.34
                var lat = Math.atan(Math.exp(y * Math.PI / 20037508.34)) * 360 / Math.PI - 90

                return [lon, lat]
            }
        },
        mounted() {            
            this.snapshotWarningPoints.then(data => {
                data.forEach(warningPoint => {
                    this.warningPoints.push(warningPoint.data())
                })
            })

            this.snapshotInterestPoints.then(data => {
                data.forEach(interestPoint => {
                    this.interestPoints.push(interestPoint.data())
                })
            })

            var doc = this.subscriptionDoc
            var data = doc.partecipanti

            if (this.isJourney) {
                var templateId = doc.modello_Id
                
                this.snapshotTemplates.then(data => {
                    data.forEach(template => {
                        if (template.id == templateId) {
                            var templateData = template.data()
                            this.startPositionJourney = templateData.partenza
                            this.arrivePositionJourney = templateData.arrivo
                            var middles = templateData.intermedi

                            middles.forEach(middle => {
                                var middleCoords = middle.coordsLonLat
                                this.middlePoints.push([middleCoords[0], middleCoords[1]])
                            })
                        }
                    })
                }).then(() => {
                    // Crea il percorso da seguire
                    var route = "http://router.project-osrm.org/route/v1/driving/"
                    route += this.startPositionJourney + ";"

                    this.middlePoints.forEach(middle => {
                        route += middle.toString() + ";"
                    })

                    route += this.arrivePositionJourney
                    route += "?steps=true"

                    // Ottiene il percorso da seguire
                    fetch(route)
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
                        })
                })
            }

            // Read the position of all users subscribed to this event 
            let updatePosition = () => {
                var currentUser = getAuth().currentUser

                if (this.subscriptionDoc != null) {
                    data.forEach(partecipant => {
                        this.snapshotUsers.then(data => {
                            data.forEach(user => {
                                var userData = user.data()

                                if (currentUser != null && userData.email == currentUser.email) {
                                    this.center = userData.posizione
                                }

                                if (userData.username == partecipant) {
                                    this.partecipants.push(userData.posizione)
                                    this.partecipantsName.push(userData.username)

                                    return
                                } 
                            })
                        })
                    })
                }
            }

            setTimeout(updatePosition, 5000)
        }
    }
</script>

<style>
    table {
        text-align: center;
        margin: auto;
    }
</style>