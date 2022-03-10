<template>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 35vh">
        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" 
        :projection="projection" />
        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>
    </ol-map>
    <div>
        <button>Punto di ritrovo</button>
        <!--<h1>{{ title }}</h1>
        <h1>{{ start }}</h1>
        <h1>{{ end }}</h1>
        <h1>{{ closeSubscriptionDate }}</h1>-->
        <div style="margin-left: 20%; margin-right: 20%">
            <div style="width: 50vh; float: left">
                <div id="title-content">
                    <h3>Titolo: <span class="required">*</span></h3>
                    <h3>Data/Ora inizio: <span class="required">*</span></h3>
                    <h3>Data/Ora termine: <span class="required">*</span></h3>
                    <h3>Data/Ora chiusura iscrizione: <span class="required">*</span></h3>
                    <h3>Privato:</h3>
                    <label class="switch">
                    <input type="checkbox" @change="switchPrivacy($event)">
                    <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div style="width: 50vh; float: right">
                <form id="create-event-data" @submit.prevent="createEvent">
                    <input type="text" v-model="title" required>
                    <input type="datetime-local" v-model="start" required>
                    <input type="datetime-local" v-model="end" required>
                    <input type="datetime-local" v-model="closeSubscriptionDate" required>
                    <div id="password" style="display: none">
                        <input type="password" placeholder="Password" v-model="password">
                        <input type="password" placeholder="Conferma password" v-model="confirmPassword">
                    </div>
                    <input type="submit" value="CONFERMA">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { getFirestore, doc, setDoc } from "firebase/firestore"

    export default {
        data() {
            return {
                title: "",
                start: "",
                end: "",
                closeSubscriptionDate: "",
                password: "",
                confirmPassword: ""
            }
        },
        methods: {
            switchPrivacy(event) {
                if (event.target.checked) {
                    document.getElementById("password").style.display = ""
                } else {
                    document.getElementById("password").style.display = "none"
                }
            },
            createEvent() {
                const path = "raduni/" + this.title
                const eventPath = doc(getFirestore(), path)
                const eventData = {
                    titolo: this.title,
                    inizio: this.start,
                    termine: this.end,
                    chiusura_iscrizione: this.closeSubscriptionDate,
                    password: this.password,
                    ritrovo: [9.8, 9.5]
                }

                setDoc(eventPath, eventData)

                this.$router.push("/")
            }
        }
    }
</script>

<style>
    #create-event-data input {
        margin-bottom: 25px;
    }

    .required {
        color: red;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>