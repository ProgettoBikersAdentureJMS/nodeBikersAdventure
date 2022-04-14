<template>
    <div id="my-event">
        <h1>{{ title }}</h1>
        <div>
            <p>Inizia: {{ formatDate(start) }}</p>
            <p>Termina: {{ formatDate(end) }} </p>
        </div>
        <button @click="getId()">ULTERIORI INFORMAZIONI</button>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ""
            },
            start: {
                type: String,
                default: ""
            },
            end: {
                type: String,
                default: ""
            }
        },
        data() {
            return {

            }
        },
        methods: {
            formatDate(date) {
                var dateF = new Date(date)
                var day = this.formatField(dateF.getDay())
                var month = this.formatField(dateF.getMonth())
                var year = this.formatField(dateF.getFullYear())
                var hour = this.formatField(dateF.getHours())
                var minutes = this.formatField(dateF.getMinutes())

                return day + "." + month  + "." + year + " " + hour + ":" + minutes
            },
            formatField(value) {
                return value < 10 ? "0" + value : value.toString()
            },
            getId() {
                this.$emit("getId", this.title)
            }
        }
    }
</script>

<style>
    #my-event {
        background: black;
        color: white;
        display: inline-block;
        padding: 20px;
        margin: 20px;
        border-radius: 10px;
        width: 20%;
    }
</style>