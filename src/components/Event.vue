<template>
    <div id="event">
        <h1>{{ title }}</h1>
        <div>
            <p> -- map -- </p>
            <p>{{ description }}</p>
            <p>{{ meeting }}</p>
            <p>{{ date }}</p>
            <p>{{prova.current}}</p>
            <br>
            <button @click="takePart()">TAKE PART</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        meeting: {
            type: String,
            default: ""
        },
        date: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            prova: {
                current: "2022",
                previous: "2021"
            }
        }
    },
    methods: {
        takePart() {
            // 'this' is used to access props and local variables
            alert("You have taking part at event " + this.prova.current)
        }
    }
}
</script>

<style>
    #event {
        background: black;
        color: white;
        display: inline-block;
        padding: 20px;
        margin: 20px;
        border-radius: 10px;
        width: 20%;
    }

    #event button {
        width: 90%;
        padding: 10px;
    }
</style>