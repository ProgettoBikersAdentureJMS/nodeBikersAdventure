<template>
    <div>
        <ListModels @getTemplate="getTemplate" />
        <div style="margin-left: 20%; margin-right: 20%">
            <div style="width: 50vh; float: left">
                <div id="title-content">
                    <h3>Titolo: <span class="required">*</span></h3>
                    <h3>Data/Ora partenza: <span class="required">*</span></h3>
                    <h3>Data/Ora arrivo: <span class="required">*</span></h3>
                    <h3>Data/Ora chiusura iscrizione: <span class="required">*</span></h3>
                    <h3>Privato:</h3>
                    <label class="switch">
                    <input type="checkbox" @change="switchPrivacy($event)">
                    <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div style="width: 50vh; float: right">
                <form id="create-event-data" @submit.prevent="organizeJourney">
                    <input type="text" v-model="title" required>
                    <input type="datetime-local" v-model="start" required>
                    <input type="datetime-local" v-model="end" required>
                    <input type="datetime-local" v-model="closeSubscriptionDate" required>
                    <div id="passwordJourney" style="display: none">
                        <input type="password" placeholder="Password" v-model="password">
                        <input type="password" placeholder="Conferma password" v-model="confirmPassword">
                    </div>
                    <p id="error" v-if="errorMsg">{{ errorMsg }}</p>
                    <input type="submit" value="CONFERMA">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { getFirestore, doc, setDoc} from "firebase/firestore"
    import ListModels from "./ListModels.vue"

    export default {
        components: {
            ListModels
        },
        data() {
            return {
                title: "",
                start: "",
                end: "",
                closeSubscriptionDate: "",
                password: "",
                confirmPassword: "",
                templateId: "",
                participants: [], //Implementare l'array di partecipanti
                errorMsg: ""
            }
        },
        methods: {
            getTemplate(value) {
                this.templateId = value
                console.log(value)
            },
            switchPrivacy(event) {
                if (event.target.checked) {
                    document.getElementById("passwordJourney").style.display = ""
                } else {
                    document.getElementById("passwordJourney").style.display = "none"
                }
            },
            organizeJourney() {
                //controllo vari errori
                //se non sono stati inseriti nome o descrizione
                if(this.title === ""){
                    this.errorMsg = "Inserire un titolo per il tragitto"
                    return
                //se le date non sono state inserite
                }else if(this.start === "" || this.end === "" || this.closeSubscriptionDate === ""){
                    this.errorMsg = "Se il pericolo è temporaneo, è obbligatorio inserire due date valide"
                    return
                //se la fine è prima dell'inizio    
                }else if(this.start > this.end){
                    this.errorMsg = "La data di fine deve essere maggiore di quella di inizio"
                    return
                //Se l'inizio è prima della data corrente
                }else if((new Date()) > new Date(this.end)){
                    this.errorMsg = "La data di inizio non può essere già passata"
                    return
                //Se la chiusura è prima della data corrente
                }else if((new Date()) > new Date(this.closeSubscriptionDate)){
                    this.errorMsg = "La data di chiusura delle iscrizioni non può essere già passata"
                    return
                //Se la fine è prima della data corrente
                }else if((new Date()) > new Date(this.end)){
                    this.errorMsg = "La data di fine non può essere già passata"
                    return
                }
                const path = "tragitti/" + this.title
                const journeyPath = doc(getFirestore(), path)

                const journeyData = {
                    titolo: this.title,
                    partenza: this.start,
                    arrivo: this.end,
                    chiusura_iscrizione: this.closeSubscriptionDate,
                    password: this.password,
                    modello_Id: this.templateId
                }

                setDoc(journeyPath, journeyData)

                this.$router.push("/")
            }
        }
    }
</script>