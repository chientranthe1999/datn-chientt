import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASURE_ID,
}

const app = initializeApp(firebaseConfig)

getAnalytics(app)

const storage = getStorage(app)

const upload = async (file: File, folder = 'images') => {
  const { name, type } = file
  const storageRef = ref(storage, `${folder}/${name}`)

  const metaData = {
    contentType: type,
  }

  const result = await uploadBytes(storageRef, file, metaData)

  return getDownloadURL(result.ref)
}

export { storage, upload }
