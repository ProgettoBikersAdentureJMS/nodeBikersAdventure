<template>
    <div>
        <h1>Gruppi</h1>
        <CreateGroup />
        <GroupsList />
    </div>
</template>

<script>
    import CreateGroup from "../components/CreateGroup.vue"
    import GroupsList from "../components/GroupsList.vue"

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