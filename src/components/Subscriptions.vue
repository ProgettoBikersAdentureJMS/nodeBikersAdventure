<template>
    <h1>Subscriptions</h1>
    <div class="event">
        <h1>{{ title }}</h1>
        <div>
            <p>Inizia: {{ formatDate(start) }}</p>
            <p>Termina: {{ formatDate(end) }} </p>
            <br>
            <button @click="takePart()">TAKE PART</button>
        </div>
    </div>
</template>

<style>

</style>