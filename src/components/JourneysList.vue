<template>
    <div>
        <JourneyCard v-for="journey, itemIndex in journeys"
        :key="itemIndex"
        :title="journey.titolo"
        :start="journey.partenza"
        :end="journey.arrivo"
        @takePart="takePart" />
    </div>
</template>

<script>
import JourneyCard from "./JourneyCard.vue"
import { collection, getFirestore, getDocs, updateDoc, doc } from '@firebase/firestore'
import { getAuth } from "firebase/auth"

export default {
    components: {
        JourneyCard
    },
    data() {
        return {
            snapshot: getDocs(collection(getFirestore(), "tragitti")),
            snapshotUsers: getDocs(collection(getFirestore(), "utenti")),
            journeys: []
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
                            const pathJourney = "tragitti/" + value
                            const documentUser = doc(getFirestore(), pathUser)
                            const documentJourney = doc(getFirestore(), pathJourney)
                            var tragitti = []
                            var partecipanti = []

                            if (userData.tragitti != null) {
                                tragitti.forEach(journey => {
                                    tragitti.push(journey)
                                })
                            }

                            tragitti.push(value)

                            const journeys = { tragitti }
                            updateDoc(documentUser, journeys)

                            this.journeys.forEach(journey => {
                                if (journey.partecipanti != null) {
                                    if (journey.titolo == value) {
                                        journey.partecipanti.forEach(partecipant => {
                                            partecipanti.push(partecipant)
                                        })
                                    }
                                }
                            })

                            partecipanti.push(userData.username)

                            const partecipantsJourney = { partecipanti }
                            updateDoc(documentJourney, partecipantsJourney)
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
                var journey = doc.data()
                this.journeys.push(journey)
            })
        })
    }
}
</script>