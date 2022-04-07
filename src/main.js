import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// OpenLayer
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'

// Firebase
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"

// Views
import App from './App.vue'
import Home from './views/Home.vue'
import Events from './views/Events.vue'
import Journeys from './views/Journeys.vue'
import Groups from './views/Groups.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Subscriptions from './views/Subscriptions.vue'
import Point from './views/Point.vue'

// Routing config
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Home', component: Home},
        {path: '/events', name: 'Events', component: Events},
        {path: '/journeys', name: 'Journeys', component: Journeys},
        {path: '/subscriptions', name: 'Subscriptions', component: Subscriptions},
        {path: '/groups', name: 'Gruppi', component: Groups},
        {path: '/register', name: 'Register', component: Register},
        {path: '/login', name: 'Login', component: Login},
        {path: '/profile', name: 'Profile', component: Profile},
        {path: '/point', name: 'AddPoint', component: Point}
    ]
})

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBKCNQMONinq8Sasczipgb1DmpGcMI3lUI",
  authDomain: "bikers-adventure.firebaseapp.com",
  projectId: "bikers-adventure",
  storageBucket: "bikers-adventure.appspot.com",
  messagingSenderId: "1076087557127",
  appId: "1:1076087557127:web:a2ee2b1a88ba6ceb8c2ea2",
  measurementId: "G-T9BVL2S79H"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const firestore = getFirestore()

createApp(App)
.use(router)
.use(OpenLayersMap)
.use(analytics)
.mount('#app')
