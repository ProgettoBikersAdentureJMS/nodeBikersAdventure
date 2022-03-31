<template>
    <div id="group">
        <img :src="image">
        <p><b>{{ name }}</b></p>
        <button>Ulteriori informazioni</button>
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
        }
    }
</script>

<style>
    #group {
        display: inline-block;
        border: 1px solid black;
        padding-left: 20px;
        padding-right: 20px;
        margin-left: 20px;
        margin-right: 20px;
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
</style>