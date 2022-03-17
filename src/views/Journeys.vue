<template>
    <div>
        <h1>Journeys</h1>
        <button @click="changeView(1)">Crea un modello</button>
        <button @click="changeView(2)">Organizza un tragitto</button>
        <button @click="changeView(3)">Visualizza tutti i tragitti</button>
        <CreateModel v-bind:style="{display: displayCreate}" />
        <Journey v-bind:style="{display: displayOrganize}" />
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
                displayCreate: "none",
                displayOrganize: "block",
                displayList: "none"
            }
        },
        methods: {
            changeView(id) {
				if (id == 1) {
					this.displayCreate = "block"
                    this.displayOrganize = "none"
                    this.displayList = "none"
				} else {
					this.displayCreate = "none"
                    this.displayOrganize = "block"
                    this.displayList = "none"
				}
			}
        }
    }
</script>