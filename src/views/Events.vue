<template>
    <div>
        <h1>Raduni</h1>
		<button @click="changeView(1)">Organizza un raduno</button>
		<button @click="changeView(2)">Visualizza tutti i raduni</button>
	    <EventsList v-if="displayList" />
		<CreateEvent v-if="displayCreate" />
    </div>
</template>

<script>
	import EventsList from '../components/EventsList.vue'
	import CreateEvent from '../components/CreateEvent.vue'
    import { getAuth } from "firebase/auth"
    import { getFirestore, doc, updateDoc, getDocs, collection } from "firebase/firestore"

	export default {
		components: {
			EventsList,
			CreateEvent
		},
		data() {
			return {
				displayList: false,
				displayCreate: true,
                snapshotUsers: getDocs(collection(getFirestore(), "utenti"))
			}
		},
		methods: {
			changeView(id) {
				if (id == 1) {
					this.displayCreate = true
					this.displayList = false
				} else {
					this.displayList = true
					this.displayCreate = false
				}
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

                    this.center = [position.coords.longitude, position.coords.latitude]
                },
                error => { 
                    console.log(error.message)
                }
            )
        }

		
	}
</script>