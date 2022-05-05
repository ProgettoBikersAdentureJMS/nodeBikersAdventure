<template>
    <nav id="nav">
        <div id="left">
            <a href="/" id="home">BikersAdventure</a>
            <div class="links">
                <a href="/events" v-if="isLogged">Raduni</a>
                <a href="/journeys" v-if="isLogged">Tragitti</a>
                <a href="/point" v-if="isLogged">Punto di interesse/pericolo</a>
            </div>
        </div>
        <div id="right">
            <div class="links">
                <a href="/subscriptions" v-if="isLogged">Le mie iscrizioni</a>
                <a href="/groups" v-if="isLogged">Gruppi</a>
                <a href="/login" v-if="!isLogged">Accedi</a>
                <a href="/profile" v-if="isLogged">Profilo</a>
            </div>
            <button id="menu" @click="showMenu">{{ menuContent }}</button>
        </div>
    </nav>
</template>

<style>
    #nav {
        width: 95%;
        margin: auto;
        height: 6vh;
    }

    #nav a {
        text-decoration: none;
        margin-left: 2vh;
        margin-right: 2vh;
        color: black;
    }

    #nav a:visited {
        color: black;
    }

    #left * {
        float: left;
        margin-top: 2vh;
        margin-bottom: 2vh;
    }

    #right * {
        float: right;
        margin-top: 2vh;
        margin-bottom: 2vh;
    }

    #home {
        color: lightgray;
    }

    #menu {
        display: none;
    }

    @media only screen and (max-width: 400px) {
        #nav {
            display: flex;
            flex-direction: column;
            height: fit-content;
            align-items: center;
        }

        #left, #right {
            display: flex;
            flex-direction: column;
            float: none;
            margin: 0;
        }

        .links {
            display: none;
        }

        #menu {
            display: inline-block;
        }
    }
</style>

<script>
import { getAuth } from '@firebase/auth'
    export default {
        data() {
            return {
                menuContent: "Menu",
                menuVisible: false,
                links: document.getElementsByClassName("links"),
                isLogged: false
            }
        },
        methods: {
            showMenu() {
                this.menuVisible = !this.menuVisible

                if (this.menuVisible) {
                    this.menuContent = "X"

                    for (var i = 0; i < this.links.length; i++) {
                        this.links[i].style.display = "flex";
                        this.links[i].style.flexDirection = "column";
                        this.links[i].style.float = "none";
                        this.links[i].style.margin = "0px";
                    }
                } else {
                    this.menuContent = "Menu"

                    for (var i = 0; i < this.links.length; i++) {
                        this.links[i].style.display = "none";
                    }
                }
            }
        },
        mounted() {
            /**
             * Ogni secondo controlla se l'utente è loggato.
             * Se l'utente è loggato vengono mostrate tutte le pagine
             * tranne quella di login.
             */
            let updateNav = () => {
                var user = getAuth().currentUser

                if (user != null) {
                    this.isLogged = true
                }
            }

            setInterval(updateNav, 1000)
        }
    }
</script>
