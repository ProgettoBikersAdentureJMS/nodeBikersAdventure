<template>
    <div>
        <Event v-for="event, itemIndex in events"
        :key="itemIndex"
        :title="event.titolo"
        :start="event.inizio"
        :end="event.termine" />
    </div>
</template>

<script>
import { collection, getFirestore, getDocs, updateDoc } from '@firebase/firestore'
import Event from "./Event.vue"

export default {
    components: {
        Event
    },
    data() {
        return {
            snapshot: getDocs(collection(getFirestore(), "raduni")),
            events: []
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