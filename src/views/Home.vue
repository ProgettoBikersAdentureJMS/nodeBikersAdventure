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

        <!-- Raduni -->
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
    </ol-map>
</template>

<script>
    import ping from "../assets/ping.png" // Import image
    import { getAuth } from "firebase/auth"
    import { getFirestore, doc, collection, getDocs, updateDoc} from "firebase/firestore"
    import warning from "../assets/warning.png"
    import interest from "../assets/interest.png"

    export default {
        data() {
            return {
                snapshotUsers: getDocs(collection(getFirestore(), "utenti")),
                snapshotWarningPoints: getDocs(collection(getFirestore(), "puntiPericolo")),
                snapshotInterestPoints: getDocs(collection(getFirestore(), "puntiInteresse")),
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
                warning,
                interest,
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
                ],
                warningPoints: [],
                interestPoints: []
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
                },
                error => { 
                    console.log(error.message)
                }
            )
        }
    }
</script>