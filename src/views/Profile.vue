<template>
    <div>
        <h1>Profile</h1>
        <button @click="confirmEmail">Email</button>
        <p v-if="email"> {{ email }} </p>
        <p v-if="verifiedMail"> {{ verifiedMail ? "verificato" : "non verificato" }} </p>
    </div>
</template>

<script>
    import { getAuth, sendEmailVerification } from "firebase/auth"

    export default {
        data() {
            return {
                email: getAuth().currentUser.email,
                verifiedMail: getAuth().currentUser.emailVerified
            }
        },

        methods: {
            confirmEmail() {
                console.log(getAuth().currentUser)
                sendEmailVerification(getAuth().currentUser)
                .then(() => {
                    console.log("email")
                })
            }
        }
    }
</script>