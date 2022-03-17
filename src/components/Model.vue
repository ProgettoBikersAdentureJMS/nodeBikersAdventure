<template>
    <div id="model">
        <h1>{{ name }}</h1>
        <button @click="use">UTILIZZA</button>
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
        methods: {
            use() {
                this.$emit("useTemplate", this.name)
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