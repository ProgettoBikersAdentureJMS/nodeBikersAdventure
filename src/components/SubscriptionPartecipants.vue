<template>
    <tr v-for="partecipant, partecipantIndex in partecipants" :key="partecipantIndex">
        <td>{{ partecipant }}</td>
    </tr>
</template>

<script>
    export default {
        props: {
            partecipants: {
                type: Array
            }
        }
    }
</script>
