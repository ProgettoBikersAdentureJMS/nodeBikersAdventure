<template>
    <div id="add-group">
        <button id="add-image" @click="showImages">
            <img v-if="!image" :src="groupIcon">
            <img :src="plusIcon">
        </button>
        <input type="text" placeholder="Nome" v-model="groupName">
        <p v-if="errMsg" id="error">Errore: {{ errMsg }}</p>
        <h3>Aggiungi partecipanti</h3>
        <AddUser @addUser="addUser" v-for="user, itemIndex in users"
        :key="itemIndex"
        :name="user" />
        <button @click="addGroup">Aggiungi gruppo</button>
    </div>
</template>

<script>
    import { collection, getDocs, getFirestore, doc, setDoc, updateDoc } from '@firebase/firestore'
    import plusIcon from "../assets/plus.png"
    import groupIcon from "../assets/group.png"
    import AddUser from "../components/AddUser.vue"

    export default {
        components: {
            AddUser
        },
        data() {
            return {
                groupName: "",
                plusIcon,
                groupIcon,
                image: null,
                snapshotUsers: getDocs(collection(getFirestore(), "utenti")),
                users: [],
                usersAdded: [],
                errMsg: ""
            }
        },
        methods: {
            showImages() {
                this.image = plusIcon
                console.log(plusIcon)
            },
            addUser(name) {
                this.usersAdded.push(name)
            },
            addGroup() {
                if (this.groupName.trim() == "") {
                    this.errMsg = "Non hai inserito tutti i campi"
                    return
                }

                if (this.image == null) {
                    this.image = groupIcon
                }

                const path = "gruppi/" + this.groupName
                const groupPath = doc(getFirestore(), path)
                const groupData = {
                    nome: this.groupName,
                    partecipanti: this.usersAdded,
                    immagine: this.image
                }

                setDoc(groupPath, groupData)

                this.$router.push("/")
            }
        },
        mounted() {
            this.snapshotUsers.then(data => {
                data.forEach(user => {
                    this.users.push(user.data().username)
                })
            })
        }
    }
</script>

<style>
    #error {
        color: red;
    }

    #add-group {
        width: 25%;
        margin-left: 37.5%;
        margin-right: 37.5%;
    }

    #add-image {
        width: 15vh;
        height: 15vh;
        border-radius: 50%;
        border: 2px solid orange;
        background: transparent;
        color: black;
    }

    #add-image img {
        width: 30px;
        height: 30px;
    }
</style>