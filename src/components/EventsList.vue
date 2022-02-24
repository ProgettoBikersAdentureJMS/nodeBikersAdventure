<template>
    <div>
        <Event v-for="event, itemIndex in events" 
        :key="itemIndex"
        :title="event.title"
        :description="event.description"
        :date="event.date" />
        <br>
        <button @click="logEvents">LOG EVENTS</button>
    </div>
</template>

<script>
import Event from "./Event.vue"

export default {
    components: {
        Event
    },
    props: {
        events: {
            type: Array,
            default: () => [] // Empty array
        }
    },
    methods: {
        logEvents() {
            console.log(this.events);
        }
    }
}
</script>