<template>
    <div>
        <h1>Gruppi</h1>
        <div id="groups-container">
            <div id="list-groups">
                <div id="add-group">
                    <button id="add-image" @click="showAddGroup">
                        <img :src="plusIcon">
                        <p>Crea un gruppo</p>
                    </button>
                </div>
                <GroupsList @getName="getName" />
            </div>
            <div id="group-info">
                <GroupInfo v-if="infoDisplay" :name="name" :partecipants="partecipants" />
                <CreateGroup v-if="createDisplay" />
            </div>
        </div>
    </div>
</template>

<script>
    import CreateGroup from "../components/CreateGroup.vue"
    import GroupsList from "../components/GroupsList.vue"
    import GroupInfo from "../components/GroupInfo.vue"
    import plusIcon from "../assets/plus.png"
    import { updateDoc, doc, getFirestore, getDocs, collection } from '@firebase/firestore'
    import { getAuth } from "firebase/auth"

    export default {
        components: {
            CreateGroup,
            GroupsList,
            GroupInfo
        },
        data() {
            return {
                plusIcon,
                infoDisplay: false,
                createDisplay: false,
                snapshotUsers: getDocs(collection(getFirestore(), "utenti")),
                snapshotGroups: getDocs(collection(getFirestore(), "gruppi")),
                partecipants: [],
                name: null
            }
        },
        methods: {
            showAddGroup() {
                this.createDisplay = true
                this.infoDisplay = false
            },
            getName(value) {
                this.infoDisplay = true
                this.createDisplay = false

                this.snapshotGroups.then(data => {
                    data.forEach(group => {
                        var groupData = group.data()

                        if (groupData.id == value) {
                            this.name = value
                            this.partecipants = groupData.partecipanti
                            
                            return
                        }
                    })
                })
            }
        },
        mounted() { // Called when page loaded all components
            navigator.geolocation.watchPosition( 
                position => {
                    var currentUser = getAuth().currentUser
                    
                    if (currentUser != null) {
                        this.snapshotUsers.then(data => {
                            data.forEach(user1 => {
                                var user = user1.data()

                                if (currentUser.email === user.email) {
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
                },
                error => { 
                    console.log(error.message)
                }
            )
        }
    }
</script>

<style>
    #group-container {
        width: fit-content;
        margin: auto;
    }
</style>
