<template>
    <div id="model">
        <h1>{{ name }}</h1>
        <button @click="use" v-bind:style="{background:buttonColor}">UTILIZZA</button>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                buttonColor: "rgba(255, 68, 0, 0.906)"
            }
        },
        methods: {
            use() {
                this.buttonColor = "rgba(210, 215, 211, 1)"

                this.$emit("getTemplate", this.name)
            }
        }
    }
</script>

<style>
    #model {
        background: black;
        color: white;
        display: inline-block;
        padding: 20px;
        margin: 20px;
        border-radius: 10px;
        width: 20%;
    }

    #model button {
        width: 90%;
        padding: 10px;
    }
</style>