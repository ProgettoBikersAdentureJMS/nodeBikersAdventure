<template>
    <Group v-for="group, itemIndex in groups"
    :key="itemIndex"
    :image="group.immagine"
    :name="group.nome"
    @getName="getName" />
</template>

<script>
    import { collection, getDocs, getFirestore, updateDoc } from '@firebase/firestore'
    import Group from "../components/Group.vue"
    import { getAuth } from '@firebase/auth'

    export default {
        components: {
            Group
        },
        data() {
            return {
                snapshotUsers: getDocs(collection(getFirestore(), "utenti")), 
                snapshotGroups: getDocs(collection(getFirestore(), "gruppi")),
                username: "bansam",
                groups: []
            }
        },
        methods: {
            getName(value) {
                this.$emit("getName", value)
            }
        },
        mounted() {
            let updateGroups = () => {
                var user = getAuth().currentUser
                this.groups = []

                if (user != null) {
                    var email = user.email

                    this.snapshotUsers.then(data => {
                        data.forEach(user => {
                            var userData = user.data()

                            if (userData.email == email) {
                                this.username = userData.username
                                return
                            }
                        })
                    })

                    this.snapshotGroups.then(data => {
                        data.forEach(group => {
                            var groupData = group.data()
                            if (groupData.partecipanti != null) {
                                if (groupData.partecipanti.includes(this.username)) {
                                    this.groups.push(groupData)
                                }
                            }
                        })
                    })
                }
            }

            setInterval(updateGroups, 1000)
        }
     }
</script>