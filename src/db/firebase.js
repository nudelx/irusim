// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref } from 'firebase/database'
export { ref, onValue, get, child, set, remove } from 'firebase/database'
export { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_DB_KEY,
  authDomain: 'irusim-260d0.firebaseapp.com',
  databaseURL: 'https://irusim-260d0-default-rtdb.firebaseio.com',
  projectId: 'irusim-260d0',
  storageBucket: 'irusim-260d0.appspot.com',
  messagingSenderId: '896719881868',
  appId: '1:896719881868:web:79101cff4de5a2954fdda9',
  measurementId: 'G-HS9DZ2CD8Z',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const database = getDatabase(app)
export const db = ref(database)
export const dbName = window.location.host === 'nudelx.github.io' ? 'shifts' : 'testShits'
