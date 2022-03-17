<template>
    <div>
        <ListModels />
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
                    <input type="submit" value="CONFERMA">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
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
                templateId: ""
            }
        },
        methods: {
            getTemplate(value) {
                this.templateId = value
            },
            switchPrivacy(event) {
                if (event.target.checked) {
                    document.getElementById("passwordJourney").style.display = ""
                } else {
                    document.getElementById("passwordJourney").style.display = "none"
                }
            },
            organizeJourney() {

            }
        }
    }
</script>