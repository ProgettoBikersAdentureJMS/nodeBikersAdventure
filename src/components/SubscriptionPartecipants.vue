<template>
    <td v-for="partecipant, partecipantIndex in partecipants" :key="partecipantIndex">
        <p>{{ partecipant }}</p>
    </td>
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
