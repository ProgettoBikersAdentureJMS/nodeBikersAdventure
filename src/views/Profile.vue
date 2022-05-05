<template>
    <div>
        <h1>Profilo</h1>
        <p>E-Mail: {{ email }}</p>
        <button @click="logOut">ESCI</button>
        <hr>
        <h3>Modifica email</h3>
        <form id="changePassword" @submit.prevent="changeEmail">
            <input type="text" v-model="oldEmail" placeholder="Vecchia email" required>
            <br>
            <br>
            <input type="text" v-model="newEmail" placeholder="Nuova email" required>
            <br>
            <br>
            <input type="submit" value="MODIFICA">
            <br>
            <p v-if="errMsg" id="error">{{ errMsg }}</p>
        </form>
    </div>
</template>

<script>
    import { getAuth, updateEmail } from "firebase/auth"
    import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore"

    export default {
        data() {
            return {
                email: "",
                oldEmail: "",
                newEmail: "",
                errMsg: "",
                snapshotUsers: getDocs(collection(getFirestore(), "utenti"))
            }
        },
        methods: {
            /**
             * Questo metodo esegue il logout dall'utente di firebase e
             * e reindirizza alla home.
             */
            logOut() {
                getAuth().signOut()
                .then(() => {
                    this.$router.push("/")
                })
            },
            changeEmail() {
                if (this.oldEmail == this.email) {
                    if (this.oldEmail != this.newEmail) {
                        updateEmail(getAuth(), this.newEmail)
                        .then()
                        .catch(error => {
                            console.log(error)
                        })       
                    } else {
                        this.errMsg = "La nuova email deve essere diversa dalla vecchia"
                    }
                } else {
                    this.errMsg = "La vecchia email non corrisponde a quella attuale"
                }
            }
        },
        mounted() {
            navigator.geolocation.watchPosition( 
                position => {
                    var currentUser = getAuth().currentUser

                    if (currentUser != null) {
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
                },
                error => { 
                    console.log(error.message)
                }
            )

            /**
             * Ogni due secondi controlla se l'utente è loggato.
             * Se l'utente è loggato vengono mostrate tutte le pagine
             * tranne quella di login.
             */
            let updateData = () => {
                var user = getAuth().currentUser

                if (user != null) {
                    this.email = user.email
                }
            }

            setInterval(updateData, 1000)
        }
    }
</script>

<style>
    button {
        margin-bottom: 20px;
        height: 4vh;
        width: 15vh;
        background: rgba(255, 68, 0, 0.906);
        color: white;
        border: 0;
    }

    #changePassword {
        margin: auto;
        width: fit-content;
        padding: 20px;
    }

    input{
        width: 100%;
        height: 3vh;
        border: 0;
        border-bottom: 1px solid rgba(255, 68, 0, 0.906);
    }

    input[type="submit"] {
        margin-bottom: 20px;
        height: 4vh;
        width: 100%;
        background: rgba(255, 68, 0, 0.906);
        color: white;
        border: 0;
    }


    #error {
        color: red;
    }
</style>