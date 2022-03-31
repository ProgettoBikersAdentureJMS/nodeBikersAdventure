<template>
    <form id="register" @submit.prevent="register">
        <input type="text" placeholder="Nome utente" v-model="username" required>
        <br>
        <br>
        <input type="email" placeholder="E-Mail" v-model="email" required>
        <br>
        <br>
        <input type="password" placeholder="Password" v-model="password" required>
        <br>
        <br>
        <p id="error" v-if="errorMsg"> {{ errorMsg }} </p>
        <br>
        <input type="submit" value="ISCRIVITI">
        <br>
        <p>Hai già un account?&nbsp;<a href="/login">Accedi</a></p>
    </form>
</template>

<script>
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
    import { getFirestore, doc, setDoc } from "firebase/firestore"

    export default {
        data() {
            return {
                username: "",
                email: "",
                password: "",
                errorMsg: ""
            }
        },
        methods: {
            /** 
             * Password complexity:
             * 1. Length greather than 8 characters
             * 2. At least 1 uppercase character, 
             * 3. At least 1 lowercase character
             * 4. At least 1 special character (numbers are special)
             */ 
            checkPasswordComplexity() {
                var lowers = 0
                var uppers = 0
                var specials = 0

                if (this.password.length >= 8) {
                    for (var i = 0; i < this.password.length; i++) {
                        var character = this.password.charAt(i);

                        if (character >= '!' && character <= '~') {
                            if (character >= 'A' && character <= 'Z') {
                                uppers++
                            } else if (character >= 'a' && character <= 'z') {
                                lowers++
                            } else {
                                specials++
                            }
                        }
                    }

                    return lowers >= 1 && uppers >= 1 && specials >= 1
                } else {
                    return false
                }
            },
            register() {
                if (this.checkPasswordComplexity()) {
                    createUserWithEmailAndPassword(getAuth(), this.email, this.password)
                    .then(user => {
                        const path = "utenti/" + this.username
                        const userPath = doc(getFirestore(), path)
                        const userData = {
                            username: this.username,
                            email: user.user.email,
                            raduni: [],
                            tragitti: []
                        }

                        setDoc(userPath, userData)

                        this.$router.push("/login")
                    })
                    .catch((error) => {
                        console.log(error)
                        switch (error.code) {
                            case "auth/email-already-in-use":
                                this.errorMsg = "L'utente esiste già"
                                break
                        }
                    })
                } else {
                    this.errorMsg = "La password non soddisfa i requisiti minimi"
                }
            }
        }
    }
</script>

<style>
    #register {
        margin: auto;
        width: fit-content;
        padding: 100px;
        border: 2px solid black;
        border-radius: 25px;
    }

    #register input{
        width: 100%;
        height: 3vh;
        border: 0;
        border-bottom: 1px solid rgba(255, 68, 0, 0.906);
    }

    #register label {
        text-align: left;
    }

    #register input[type="submit"] {
        margin-bottom: 20px;
        height: 4vh;
        width: 100%;
        background: rgba(255, 68, 0, 0.906);
        color: white;
        border: 0;
    }

    #register a {
        text-decoration: none;
    }

    #error {
        color: red;
    }
</style>