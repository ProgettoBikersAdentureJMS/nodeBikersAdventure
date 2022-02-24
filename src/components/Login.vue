<template>
    <div id="login">
        <input type="text" placeholder="E-Mail" v-model="email" required>
        <br>
        <br>
        <input type="password" placeholder="Password" v-model="password" required>
        <br>
        <br>
        <p id="error" v-if="errorMsg"> {{ errorMsg }} </p>
        <br>
        <button @click="login">ACCEDI</button>
        <br>
        <p>Non hai ancora un account?&nbsp;<a href="/register">Registrati</a></p>
    </div>
</template>

<script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

    export default {
        data() {
            return {
                email: "",
                password: "",
                errorMsg: "",
            }
        },
        methods: {
            login() {
                signInWithEmailAndPassword(getAuth(), this.email, this.password)
                .then(() => {
                    this.$router.push("/");
                })
                .catch((error) => {
                    console.log(error)
                    switch (error.code) {
                        case "auth/invalid-email":
                            errorMsg = "E-Mail non corretta"
                            break
                        case "auth/user-not-found":
                            errorMsg = "Questo utente non esiste"
                            break
                        case "auth/wrong-password":
                            errorMsg = "Password non corretta"
                            break
                    }
                })
            }
        }
    }
</script>

<style>
    #login {
        margin: auto;
        width: fit-content;
        padding: 100px;
        border: 2px solid black;
        border-radius: 25px;
    }

    #login input{
        width: 100%;
        height: 3vh;
        border: 0;
        border-bottom: 1px solid rgba(255, 68, 0, 0.906);
    }

    #login button {
        margin-bottom: 20px;
        height: 4vh;
        width: 100%;
        background: rgba(255, 68, 0, 0.906);
        color: white;
        border: 0;
    }

    #login a {
        text-decoration: none;
    }

    #error {
        color: red;
    }
</style>