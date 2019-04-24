import firebase from 'firebase/app'
import config from '../config/config'
import 'firebase/auth'
import 'firebase/firestore'
import manager from './person-manager'

firebase.initializeApp(config.firebase)


// auth Observer 
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        manager.isSinedin = true
    } else {
        manager.isSinedin = false
    }
})

