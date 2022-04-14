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

        <!-- Punti di pericolo -->
        <ol-vector-layer>
            <ol-source-vector>
                <ol-feature v-for="warning, warningIndex in warningPoints" :key="warningIndex">
                    <ol-geom-point :coordinates="warning.punto_pericolo"></ol-geom-point>
                    <ol-style>
                        <ol-style-circle :radius="20">
                            <ol-style-fill :color="fillColor"></ol-style-fill>
                            <ol-style-stroke :color="strokeColor2" :width="strokeWidth"></ol-style-stroke>
                        </ol-style-circle>
                        <!--<ol-style-icon :src="warning" :scale="1"></ol-style-icon>-->
                    </ol-style>
                </ol-feature>
            </ol-source-vector>
        </ol-vector-layer>

        <!-- Punti di interesse -->
        <ol-vector-layer>
            <ol-source-vector>
                <ol-feature v-for="interest, interestIndex in interestPoints" :key="interestIndex">
                    <ol-geom-point :coordinates="interest.punto_interesse"></ol-geom-point>
                    <ol-style>
                        <ol-style-circle :radius="30">
                            <ol-style-fill :color="fillColor"></ol-style-fill>
                            <ol-style-stroke :color="strokeColor3" :width="strokeWidth"></ol-style-stroke>
                        </ol-style-circle>
                        <!--<ol-style-icon :src="interest" :scale="1"></ol-style-icon>-->
                    </ol-style>
                </ol-feature>
            </ol-source-vector>
        </ol-vector-layer>

        <!-- Punti dove si trovano i partecipanti -->
        <ol-vector-layer>
            <ol-source-vector>
                <ol-feature v-for="partecipant, partecipantIndex in partecipants" :key="partecipantIndex">
                    <ol-geom-point :coordinates="partecipant.posizione"></ol-geom-point>
                    <ol-style>
                        <ol-style-icon :src="ping" :scale="1"></ol-style-icon>
                    </ol-style>
                </ol-feature>
            </ol-source-vector>
        </ol-vector-layer>
    </ol-map>
</template>

<script>
    import ping from "../assets/ping.png"
    import { getFirestore, collection, getDocs} from "firebase/firestore"

    export default {
        props: {
            subscriptionDoc: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                snapshotUsers: getDocs(collection(getFirestore(), "utenti")),
                snapshotWarningPoints: getDocs(collection(getFirestore(), "puntiPericolo")),
                snapshotInterestPoints: getDocs(collection(getFirestore(), "puntiInteresse")),
                warningPoints: [],
                interestPoints: [],
                partecipants: [],
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
                ping
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

            let aggiorna = () => {
                if (this.subscriptionDoc != null) {
                    var data = this.subscriptionDoc.partecipanti
                    data.forEach(partecipant => {
                        this.snapshotUsers.then(data => {
                            for (var i = 0; i < data.length; i++) {
                                console.log(data[i])
                                var userData = data[i].data()
                                if (userData.username == partecipant) {
                                    this.partecipants.push(userData.posizione)
                                    console.log(userData.posizione)
                                    break
                                }
                            }
                        })
                    })
                }
            }

            setTimeout(aggiorna, 5000)
        }
    }
</script>