<template>
    <div>
        <Event v-for="event, itemIndex in events"
        :key="itemIndex"
        :title="event.titolo"
        :start="event.inizio"
        :end="event.termine"
        @takePart="takePart" />
    </div>
</template>

<script>
import Event from "./Event.vue"
import { collection, getFirestore, getDocs, updateDoc, doc } from '@firebase/firestore'
import { getAuth } from "firebase/auth"

export default {
    components: {
        Event
    },
    data() {
        return {
            snapshot: getDocs(collection(getFirestore(), "raduni")),
            snapshotUsers: getDocs(collection(getFirestore(), "utenti")),
            events: []
        }
    },
    methods: {
        takePart(value) {
            if (getAuth().currentUser != null) {
                var currentUserEmail = getAuth().currentUser.email
                this.snapshotUsers.then(data => {
                    data.forEach(documentRef => {
                        var userData = documentRef.data()
                        if (userData.email == currentUserEmail) {
                            const pathUser = "utenti/" + userData.username
                            const pathEvent = "raduni/" + value
                            const documentUser = doc(getFirestore(), pathUser)
                            const documentEvent = doc(getFirestore(), pathEvent)
                            var raduni = []
                            var partecipanti = []

                            if (userData.raduni != null) {
                                raduni.forEach(event => {
                                    raduni.push(event)
                                })
                            }

                            raduni.push(value)

                            const events = { raduni }
                            updateDoc(documentUser, events)

                            this.events.forEach(event => {
                                if (event.partecipanti != null) {
                                    if (event.titolo == value) {
                                        event.partecipanti.forEach(partecipant => {
                                            partecipanti.push(partecipant)
                                        })
                                    }
                                }
                            })

                            partecipanti.push(userData.username)

                            const partecipantsEvent = { partecipanti }
                            updateDoc(documentEvent, partecipantsEvent)
                        }
                    })
                })

                this.$router.push("/");
            }
        }
    },
    mounted() {
        this.snapshot.then(data => {
            data.forEach(doc => {
                var event = doc.data()
                var date1 = new Date()
                var date2 = new Date(event.chiusura_iscrizione)

                if (date2 > date1) {
                    this.events.push(event)
                }
            })
        })
    }
}
</script>