<template>
    <div>
        <h1>Events</h1>
		<button @click="changeView(1)">Organizza un raduno</button>
		<button @click="changeView(2)">Visualizza tutti i raduni</button>
	    <EventsList v-bind:style="{display: displayList}" />
		<CreateEvent v-bind:style="{display: displayCreate}" />
    </div>
</template>

<script>
	import EventsList from '../components/EventsList.vue'
	import CreateEvent from '../components/CreateEvent.vue'

	export default {
		components: {
			EventsList,
			CreateEvent
		},
		data() {
			return {
				displayList: "block",
				displayCreate: "none"
			}
		},
		methods: {
			changeView(id) {
				if (id == 1) {
					this.displayCreate = "block"
					this.displayList = "none"
				} else {
					this.displayList = "block"
					this.displayCreate = "none"
				}
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
                },
                error => { 
                    console.log(error.message)
                }
            )
        }

		
	}
</script>