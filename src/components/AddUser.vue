<template>
    <div>
        <div id="user-row">
            <p>Nome: {{ name }}</p>
            <img v-if="!isAdded" :src="plusIcon" @click="addUser()">
            <img v-if="isAdded" :src="checkedIcon">
        </div>
        <br>
    </div>
</template>

<script>
    import plusIcon from "../assets/plus.png"
    import checkedIcon from "../assets/checked.png"

    export default {
        props: {
            name: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                plusIcon,
                checkedIcon,
                isAdded: false
            }
        },
        methods: {
            addUser() {
                this.$emit("addUser", this.name)
                this.isAdded = true
            }
        }
    }
</script>

<style>
    #user-row {
        display: inline-block;
    }

    #user-row p {
        float: left;
    }

    #user-row img {
        float: right;
        width: 20px;
        height: 20px;
    }
</style>
