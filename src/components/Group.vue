<template>
    <div>
        <div id="group">
            <img :src="image">
            <p><b>{{ name }}</b></p>
            <button @click="getName">Ulteriori informazioni</button>
        </div>
        <br>
    </div>
</template>

<script>
    export default {
        props: {
            image: {
                type: String,
                default: ""
            },
            name: {
                type: String,
                default: ""
            }
        },
        methods: {
            getName() {
                this.$emit("getName", this.name)
            }
        }
    }
</script>

<style>
    #group {
        display: inline-block;
        border: 1px solid black;
        padding-left: 20px;
        padding-right: 20px;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }

    #group img {
        float: left;
        border: 2px solid black;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        margin-top: 10px;
        margin-right: 10px;
    }

    #group p {
        float: left;
    }

    #group button {
        float: right;
        margin: 0;
        margin: 10px 10px 0 10px;
    }

    @media only screen and (max-width: 400px) {
        #group {
            display: block;
            width: 80%;
            margin: auto;
            padding: 5px;
            height: 6vh;
        }
    }
</style>