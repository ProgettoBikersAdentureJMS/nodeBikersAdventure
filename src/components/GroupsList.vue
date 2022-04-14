<template>
    <Group v-for="group, itemIndex in groups"
    :key="itemIndex"
    :image="group.immagine"
    :name="group.nome"
    @getName="getName" />
</template>

<script>
    import { collection, getDocs, getFirestore } from '@firebase/firestore'
    import Group from "../components/Group.vue"

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
            var email = "banfisamuel.scuola@gmail.com"

            this.snapshotUsers.then(data => {
                data.forEach(user => {
                    if (user.data().email == email) {
                        this.username = user.data().username
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
</script>