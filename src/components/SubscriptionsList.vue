<template>
    <div v-if="!setMap">
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
        :title="event.titolo" 
        :start="event.partenza" 
        :end="event.arrivo" />
    </div>
    <SubscriptionMap v-if="setMap" :subscriptionDoc="doc" />
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
                doc: null
            }
        },
        methods: {
            getId(value) {
                this.events.forEach(event => {
                    if (value == event.titolo) {
                        this.doc = event
                    }    
                })
                this.setMap = true
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

                                return
                            }
                        })
                    })
                }
            }

            setInterval(updateSubscriptions, 1000)

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