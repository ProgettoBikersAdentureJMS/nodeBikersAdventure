<template>
    <div v-if="!setMap && !setMapJourney">
        <h1>Raduni</h1>
        <hr>
        <Subscription v-for="event, itemIndex in events"
        :key="itemIndex"
        :title="event.titolo" 
        :start="event.inizio" 
        :end="event.termine"
        @getId="getId" />
        <br>
        <h1>Tragitti</h1>
        <hr>
        <Subscription v-for="journey, itemIndex in journeys"
        :key="itemIndex"
        :title="journey.titolo" 
        :start="journey.partenza" 
        :end="journey.arrivo"
        @getId="getId" />
    </div>
    <SubscriptionMap v-if="setMap" :subscriptionDoc="doc" />
    <SubscriptionMap v-if="setMapJourney" :subscriptionDoc="doc" :isJourney="true" />
</template>

<script>
    import Subscription from "./Subscription.vue"
    import SubscriptionMap from "./SubscriptionMap.vue"
    import { collection, getDocs, getFirestore, doc, updateDoc } from '@firebase/firestore'
    import { getAuth } from '@firebase/auth'

    export default {
        components: {
            Subscription,
            SubscriptionMap
        },
        data() {
            return {
                snapshotUsers: getDocs(collection(getFirestore(), "utenti")),
                snapshotEvents: getDocs(collection(getFirestore(), "raduni")),
                snapshotJourneys: getDocs(collection(getFirestore(), "tragitti")),
                events: [],
                eventsName: [],
                journeys: [],
                journeysName: [],
                setMap: false,
                setMapJourney: false,
                doc: null
            }
        },
        methods: {
            /**
             * Questo metodo riceve o l'id dell'evento o l'id del tragitto
             * e imposta la variabile il documento da passare alla mappa.
             */
            getId(value) {
                this.events.forEach(event => {
                    if (value == event.titolo) {
                        this.doc = event
                        this.setMap = true
                        this.setMapJourney = false

                        return
                    }
                })

                if (this.doc == null) {
                    this.journeys.forEach(journey => {
                        this.doc = journey
                        this.setMapJourney = true
                        this.setMap = false

                        return
                    })
                }
            },
            resetData() {
                this.events = []
                this.eventsName = []
                this.journeys = []
                this.journeysName = []
            }
        },
        mounted() {
            /**
             * Questo metodo controlla ogni secondo che vengano mostrate tutte
             * le iscrizioni dell'utente.
             */
            let updateSubscriptions = () => {
                var user = getAuth().currentUser

                if (user != null) {
                    var currentEmail = getAuth().currentUser.email
                    this.resetData()

                    this.snapshotUsers.then(data => {
                        data.forEach(user => {
                            var email = user.data().email

                            if (email == currentEmail) {
                                this.user = user

                                user.data().raduni.forEach(eventName => {
                                    this.eventsName.push(eventName)
                                })

                                user.data().tragitti.forEach(journeyName => {
                                    this.journeysName.push(journeyName)
                                })

                                this.snapshotEvents.then(data => {
                                    data.forEach(event => {
                                        if (this.eventsName.includes(event.id)) {
                                            this.events.push(event.data())
                                        }
                                    })
                                })

                                this.snapshotJourneys.then(data => {
                                    data.forEach(journey => {
                                        if (this.journeysName.includes(journey.id)) {
                                            this.journeys.push(journey.data())
                                        }
                                    })
                                })

                                return
                            }
                        })
                    })
                }
            }

            updateSubscriptions()
            setInterval(updateSubscriptions, 3000)

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

<style>

</style>