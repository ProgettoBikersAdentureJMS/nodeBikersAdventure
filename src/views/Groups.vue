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
    import { collection, getDocs, getFirestore } from '@firebase/firestore'
    import plusIcon from "../assets/plus.png"

    export default {
        components: {
            CreateGroup,
            GroupsList,
            GroupInfo
        },
        data() {
            return {
                plusIcon,
                infoDisplay: '',
                createDisplay: 'none',
                snapshotGroups: getDocs(collection(getFirestore(), "gruppi")),
                name: '',
                partecipants: []
            }
        },
        methods: {
            showAddGroup() {
                this.createDisplay = ""
                this.infoDisplay = "none"
            },
            getName(value) {
                this.createDisplay = "none"
                this.infoDisplay = ""

                this.name = value
                
                this.snapshotGroups.then(groups => {
                    groups.forEach(group => {
                        var groupData = group.data()

                        if (groupData.nome == this.name) {
                            this.partecipants = groupData.partecipanti
                        }
                    })
                })
            }
        }
    }
</script>

<style>
    #groups-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #list-groups, #group-info {
        flex: 1;
    }

    #group-info {
        flex: 1;
    }
</style>