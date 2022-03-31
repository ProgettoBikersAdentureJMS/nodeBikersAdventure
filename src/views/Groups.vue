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
        }   
    }
</script>