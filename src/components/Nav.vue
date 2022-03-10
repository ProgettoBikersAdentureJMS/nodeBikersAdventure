<template>
    <nav id="nav">
        <div id="left">
            <a href="/" id="home">BikersAdventure</a>
            <a href="/events">Raduni</a>
            <a href="/journeys">Tragitti</a>
        </div>
        <div id="right">
            <a href="/subscriptions">Le mie iscrizioni</a>
            <a href="/groups">Gruppi</a>
            <a href="/login">Accedi</a>
            <a href="/profile">Profilo</a>
        </div>
    </nav>
</template>

<style>
    #nav {
        background: white;
        border: 2px solid black;
        width: 95%;
        margin: auto;
        height: 6vh;
    }

    #nav a {
        text-decoration: none;
        margin-left: 2vh;
        margin-right: 2vh;
    }

    #nav a:visited {
        color: black;
    }

    #left {
        float: left;
        margin-top: 2vh;
        margin-bottom: 2vh;
    }

    #right {
        float: right;
        margin-top: 2vh;
        margin-bottom: 2vh;
    }

    #home {
        color: lightgray;
    }
</style>