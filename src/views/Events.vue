<template>
    <div>
        <h1>Events</h1>
		<button @click="changeView(1)">Organizza un raduno</button>
		<button @click="changeView(2)">Visualizza tutti i raduni</button>
	    <EventsList v-bind:style="{display: displayList}" />
		<CreateEvent v-bind:style="{display: displayCreate}" />
    </div>
</template>

<script>
	import EventsList from '../components/EventsList.vue'
	import CreateEvent from '../components/CreateEvent.vue'

	export default {
		components: {
			EventsList,
			CreateEvent
		},
		data() {
			return {
				displayList: "block",
				displayCreate: "none"
			}
		},
		methods: {
			changeView(id) {
				if (id == 1) {
					this.displayCreate = "block"
					this.displayList = "none"
				} else {
					this.displayList = "block"
					this.displayCreate = "none"
				}
			}
		}
	}
</script>