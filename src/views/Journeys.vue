<template>
    <div>
        <h1>Journeys</h1>
        <button @click="changeView(1)">Crea un modello</button>
        <button @click="changeView(2)">Organizza un tragitto</button>
        <button @click="changeView(3)">Visualizza tutti i tragitti</button>
        <CreateModel v-if="displayCreate" />
        <Journey v-if="displayOrganize" />
    </div>
</template>

<script>
    import CreateModel from "../components/CreateModel.vue"
    import Journey from "../components/Journey.vue"

    export default {
        components: {
            CreateModel,
            Journey
        },
        data() {
            return {
                displayCreate: false,
                displayOrganize: true,
                displayList: false
            }
        },
        methods: {
            changeView(id) {
				if (id == 1) {
					this.displayCreate = true
                    this.displayOrganize = false
                    this.displayList = false
				} else if (id == 2) {
					this.displayCreate = false
                    this.displayOrganize = true
                    this.displayList = false
				} else {
                    this.displayCreate = false
                    this.displayOrganize = false
                    this.displayList = true
                }
			}
        }
    }
</script>