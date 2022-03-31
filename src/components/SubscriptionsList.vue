<template>
    <div>
        <h1>Raduni</h1>
        <hr>
        <Subscription v-for="event, itemIndex in events"
        :key="itemIndex"
        :title="event.titolo" 
        :start="event.inizio" 
        :end="event.termine" />
        <br>
        <h1>Tragitti</h1>
        <hr>
        <Subscription v-for="journey, itemIndex in journeys"
        :key="itemIndex"
        :title="event.titolo" 
        :start="event.partenza" 
        :end="event.arrivo" />
    </div>
</template>

<script>
    import Subscription from "./Subscription.vue"
    import { collection, getDocs, getFirestore } from '@firebase/firestore'
    import { getAuth } from '@firebase/auth'

    export default {
        components: {
            Subscription
        },
        data() {
            return {
                snapshotUsers: getDocs(collection(getFirestore(), "utenti")),
                snapshotEvents: getDocs(collection(getFirestore(), "raduni")),
                snapshotJourneys: getDocs(collection(getFirestore(), "tragitti")),
                user: null,
                eventsName: [],
                events: [],
                journeysName: [],
                journeys: []
            }
        },
        mounted() {
            //var currentEmail = getAuth().currentUser.email
            var currentEmail = "banfisamuel.scuola@gmail.com"

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
        }
    }
</script>

<style>

</style>