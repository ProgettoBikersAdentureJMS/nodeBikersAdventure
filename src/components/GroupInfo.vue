<template>
    <div>
        <h1>{{ name }}</h1>
        <hr>
        <h2>Partecipanti:</h2>
        <h3 v-for="partecipant, itemIndex in partecipants" :key="itemIndex"> 
            {{ partecipant }}
        </h3>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default: "Nome"
            },
            partecipants: {
                type: Array,
                default: []
            }
        }   
    }
</script>
