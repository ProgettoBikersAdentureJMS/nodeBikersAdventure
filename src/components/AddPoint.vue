<!-- aggiungere un punto alla mappa, di pericolo o di interesse-->
<template>
    <div>
        <button @click="enableSelect(1)">Punto di pericolo</button>
        <button @click="enableSelect(2)">Punto di interesse</button>

<<<<<<< HEAD
        <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 35vh">
=======
<<<<<<< HEAD
        <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 35vh">
=======
        <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 70vh">
>>>>>>> 3b5fdef4cfe4c108957e016af8447870056cd196
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
            <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" 
                :projection="projection" />
            <ol-tile-layer>
                <ol-source-osm />
            </ol-tile-layer>

            <ol-vector-layer>
                <ol-source-vector>
                    <ol-interaction-draw v-if="selectWarningPoint" :type="drawType" @drawstart="drawStart($event)">
                    </ol-interaction-draw>
                </ol-source-vector>

                <ol-style>
                    <ol-style-icon :src="warning" :scale="0.1"></ol-style-icon>
                </ol-style>
            </ol-vector-layer>

            <ol-vector-layer>
                <ol-source-vector>
                    <ol-interaction-draw v-if="selectInterestPoint" :type="drawType" @drawstart="drawStart($event)">
                    </ol-interaction-draw>
                </ol-source-vector>

                <ol-style>
                    <ol-style-icon :src="interest" :scale="0.1"></ol-style-icon>
                </ol-style>
            </ol-vector-layer>

        </ol-map>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
        <label id="choice" type="text" style="font-size:40px; color:orange; margin:20px">pericolo/interesse</label>
        <div style="margin-left: 20%; margin-right: 20%">
            <!--div e form per il punto di interesse-->
            <div style="width: 50vh; float: left" v-if="selectWarningPoint">
                <div id="title-content">
                    <h3>Nome del pericolo: <span class="required">*</span></h3>
                    <h3>Breve descrizione: <span class="required">*</span></h3>
                    <h3>Temporaneo:</h3>
                    <label class="switch" style="margin:10px"> 
                        <input type="checkbox" @change="switchToDate($event)">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div style="width: 50vh; float: right" v-if="selectWarningPoint">
                <form @submit.prevent="saveWarning">
                <input type="text" placeholder="Nome del pericolo" v-model="name" required>
                <input type="text" placeholder="Breve descrizione" maxlength="100" v-model="description" required>
                
                <div id="temporary" style="display:none">
                    <br>
                    <input type="datetime-local" v-model="startWarning" required>
                    <input type="datetime-local" v-model="endWarning" required>
                </div>
                <p id="error" v-if="errorMsg">{{ errorMsg }}</p>
                <input type="submit" value="CONFERMA">
            </form>
            </div>



            <!--div e form per il punto di interesse-->
            <div style="width: 50vh; float: left" v-if="selectInterestPoint">
                <div id="title-content">
                    <h3>Nome del punto di interesse: <span class="required">*</span></h3>
                    <h3>Breve descrizione: <span class="required">*</span></h3>
                </div>
            </div>
            <div style="width: 50vh; float:right" v-if="selectInterestPoint">
                <form @submit.prevent="saveInterest">
                    <input type="text" placeholder="Nome del punto di interesse" v-model="name" required>
                    <input type="text" placeholder="Breve descrizione" maxlength="100" v-model="description" required>

                    <p id="error" v-if="errorMsg">{{ errorMsg }}</p>
                    <input type="submit" value="CONFERMA">
                </form>
            </div>
        </div>
<<<<<<< HEAD
=======
=======
>>>>>>> 3b5fdef4cfe4c108957e016af8447870056cd196
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
    </div>
</template>

<script>
<<<<<<< HEAD
    import { getFirestore, doc, setDoc} from "firebase/firestore"
    import warning from "../assets/warning.png"
    import interest from "../assets/interest.png"
=======
<<<<<<< HEAD
    import { getFirestore, doc, setDoc} from "firebase/firestore"
    import warning from "../assets/warning.png"
    import interest from "../assets/interest.png"
=======
    import warning from "../assets/warning.png"
    import interest from "../assets/interest.png"
    import ping from "../assets/ping.png"
>>>>>>> 3b5fdef4cfe4c108957e016af8447870056cd196
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
    import { transform } from "ol/proj"

    export default {
        data() {
            return {
                center: [0, 0],
                projection: 'EPSG:4326',
                zoom: 16,
                rotation: 0,
                drawType: "Point",
                selectWarningPoint: false,
                selectInterestPoint: false,
                warningPoint: [0, 0],
                interestPoint: [0, 0],
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
                errorMsg: "",
                
                //path per le immagini
                warning, 
                interest,

                startWarning :"",
                endWarning : "",
                warningIsTemporary : false,

                //salvo nome e descrizione sia per punti di pericolo che di interesse
                name: "",
                description: ""
<<<<<<< HEAD
=======
=======
                name: "",
                errorMsg: "",
                warning,
                interest,
                ping
>>>>>>> 3b5fdef4cfe4c108957e016af8447870056cd196
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
            }
        },
        methods: {
            
            enableSelect(id) {
                switch (id) {
                    case 1:
                        this.selectWarningPoint = true
                        this.selectInterestPoint = false
<<<<<<< HEAD
                        document.getElementById("choice").innerHTML="Punto di pericolo"
=======
<<<<<<< HEAD
                        document.getElementById("choice").innerHTML="Punto di pericolo"
=======
>>>>>>> 3b5fdef4cfe4c108957e016af8447870056cd196
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
                        break
                    case 2:
                        this.selectWarningPoint = false
                        this.selectInterestPoint = true
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
                        document.getElementById("choice").innerHTML="Punto di interesse"
                        break
                }
            },
            switchToDate(event) {
                if (event.target.checked) {
                    document.getElementById("temporary").style.display = ""
                    this.warningIsTemporary = true
                } else {
                    document.getElementById("temporary").style.display = "none"
                    this.warningIsTemporary = false
                }
            },
<<<<<<< HEAD
=======
=======
                        break
                }
            },
>>>>>>> 3b5fdef4cfe4c108957e016af8447870056cd196
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
            drawStart(event) {
                // https://openlayers.org/en/latest/apidoc/module-ol_proj.html#.transform
                var coords = event.feature.getGeometry().getCoordinates()

                // Trasforma le coordinate in longitudine e latitudine
                var coordsLonLat = transform(coords, "EPSG:4326", "EPSG:4326")
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a


                if (this.selectWarningPoint) {
                    //selezionato un warning

<<<<<<< HEAD
=======
=======
                

                if (this.selectWarningPoint) {
>>>>>>> 3b5fdef4cfe4c108957e016af8447870056cd196
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
                    this.warningPoint = coordsLonLat
                } else {
                    this.interestPoint = coordsLonLat
                }
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
            },
            saveInterest() {
                //controllo vari errori

                //se il punto non è stato selezionato
                if(this.interestPoint[0] == 0 && this.interestPoint[1] == 0){
                    this.errorMsg = "Selezionare un punto sulla mappa"
                    return
                }
                //se non sono stati inseriti nome o descrizione
                if(this.name === "" || this.description === ""){
                    this.errorMsg = "Digitare sia un nome che una descrizione"
                    return
                }
                const path = "puntiInteresse/" + this.name
                const interestPath = doc(getFirestore(), path)
                const interestData = {
                    nome: this.name,
                    punto_interesse: this.interestPoint
                }

                setDoc(interestPath, interestData)

                this.$router.push("/")
            },
            saveWarning() {
                //controllo vari errori

                //se il punto non è stato selezionato
                if(this.warningPoint[0] == 0 && this.warningPoint[1] == 0){
                    this.errorMsg = "Selezionare un punto sulla mappa"
                    return
                }
                //se non sono stati inseriti nome o descrizione
                if(this.name === "" || this.description === ""){
                    this.errorMsg = "Digitare sia un nome che una descrizione"
                    return
                }
                var warningData = null
                if(this.warningIsTemporary){

                    //se le date non sono state inserite
                    if(this.startWarning === "" || this.endWarning === ""){
                        this.errorMsg = "Se il pericolo è temporaneo, è obbligatorio inserire due date valide"
                        return
                    //se la fine è prima dell'inizio    
                    }else if(this.startWarning > this.endWarning){
                        this.errorMsg = "La data di fine deve essere maggiore di quella di inizio"
                        return
                    //Se la fine è prima della data corrente
                    }else if((new Date()) > new Date(this.endWarning)){
                        this.errorMsg = "La data di fine deve essere maggiore di adesso"
                        return
                    }

                    warningData = {
                        nome: this.name,
                        descrizione: this.description,
                        punto_pericolo: this.warningPoint,
                        temporaneo: true,
                        inizio_pericolo: this.startWarning,
                        fine_pericolo: this.endWarning
                    }
                }else{
                    warningData = {
                        nome: this.name,
                        descrizione: this.description,
                        punto_pericolo: this.warningPoint,
                        temporaneo: false
                    }
               
                }
                //se tutto è andato bene, creo la tabella con all'interno il pacchetto di dati
                const path = "puntiPericolo/" + this.name
                const warningPath = doc(getFirestore(), path)

                setDoc(warningPath, warningData)

                this.$router.push("/")
<<<<<<< HEAD
            }
        },
        mounted() { // Called when page loaded all components
            
            navigator.geolocation.watchPosition( 
                position => {
                    var currentUser = getAuth().currentUser
                    if(currentUser != null){

                        this.snapshotUsers.then(data => {
                            data.forEach(user1 => {
                                var user = user1.data()
                                if(currentUser.email === user.email){
                                    //aggiorna nel database
                                    const path = "utenti/" + user.username
                                    const document = doc(getFirestore(), path)
                                    const currentPosition = {
                                        posizione: [position.coords.longitude, position.coords.latitude]
                                    }
                                    updateDoc(document, currentPosition)
                                }
                            })
                        })
                        
                    }
                    this.center = [position.coords.longitude, position.coords.latitude]
                    console.log(this.center)
=======
=======
>>>>>>> 3b5fdef4cfe4c108957e016af8447870056cd196
            }
        },
        mounted() {
            navigator.geolocation.watchPosition( 
                position => {
                    this.center = [position.coords.longitude, position.coords.latitude]
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
                },
                error => { 
                    console.log(error.message)
                }
            )
        }
    }
</script>

<style>
<<<<<<< HEAD
    input{
        margin: 10px;
    }
=======
<<<<<<< HEAD
    input{
        margin: 10px;
    }
=======
>>>>>>> 3b5fdef4cfe4c108957e016af8447870056cd196
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
    button {
        margin: 20px;
    }

    #error {
        color: red;
    }
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a
    
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
        background-color: orange;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px orange;
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
<<<<<<< HEAD
=======
=======
>>>>>>> 3b5fdef4cfe4c108957e016af8447870056cd196
>>>>>>> 8d9e5958358fa68cf3012399a9b43c784c2b7f9a

</style>
