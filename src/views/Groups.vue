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
                <GroupInfo 
                v-bind:style="{display: infoDisplay}"
                :name="name"
                :partecipants="partecipants" />
                <CreateGroup v-bind:style="{display: createDisplay}" />
            </div>
        </div>
    </div>
</template>

<script>
    import CreateGroup from "../components/CreateGroup.vue"
    import GroupsList from "../components/GroupsList.vue"
    import GroupInfo from "../components/GroupInfo.vue"
    import { updateDoc, doc, getFirestore } from '@firebase/firestore'
    import plusIcon from "../assets/plus.png"

    export default {
        components: {
            CreateGroup,
            GroupsList
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
                },
                error => { 
                    console.log(error.message)
                }
            )
        }
    }
</script>
