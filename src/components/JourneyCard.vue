<template>
    <div id="journey-card">
        <h1>{{ title }}</h1>
        <div>
            <p>Inizia: {{ formatDate(start) }}</p>
            <p>Termina: {{ formatDate(end) }} </p>
            <button @click="takePart">TAKE PART</button>
        </div>
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
        methods: {
            takePart() {
                this.$emit("takePart", this.title)
            },
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
            }
        }
    }
</script>

<style>
    #journey-card {
        background: black;
        color: white;
        display: inline-block;
        padding: 20px;
        border-radius: 10px;
        width: 20%;
    }

    @media only screen and (max-width: 400px) {
        #journey-card {
            display: block;
            width: 80%;
            margin: auto;
            height: fit-content;
            padding: 5px;
        }
    }
</style>