<template>
    <div id="event">
        <h1>{{ title }}</h1>
        <div>
            <p>Inizia: {{ formatDate(start) }}</p>
            <p>Termina: {{ formatDate(end) }} </p>
            <br>
            <button @click="takePart">TAKE PART</button>
        </div>
    </div>
</template>

<script>
    import { getFirestore, doc, updateDoc, collection, getDocs } from "firebase/firestore"
    import { getAuth } from "firebase/auth"

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
                snapshot: getDocs(collection(getFirestore(), "utenti"))
            }
        },
        methods: {
            takePart() {
                var currentUserEmail = getAuth().currentUser.email
                this.snapshot.then(data => {
                    data.forEach(doc => {
                        var userData = doc.data()
                        if (userData.email == currentUserEmail) {
                            //update doc
                        }
                    })
                })
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