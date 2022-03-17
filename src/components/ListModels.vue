<template>
    <div>
        <h1>Scegli il modello</h1>
        <Model @useTemplate="useTemplate" v-for="model, itemIndex in models" :key="itemIndex" :name="model.nome" />
    </div>
</template>

<script>
    import Model from "./Model.vue"
    import { getFirestore, collection, getDocs } from "firebase/firestore"

    export default {
        components: { 
            Model 
        },
        data() {
            return {
                snapshot: getDocs(collection(getFirestore(), "modelli")),
                models: [],
            }
        },
        mounted() {
            this.snapshot.then(models => {
                models.forEach(model => {
                    this.models.push(model.data())
                })
            })
        },
        methods: {
            useTemplate(value) {
                this.$emit("getTemplate", this.value)
            }
        }
    }
</script>