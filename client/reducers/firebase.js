// import firebase from 'firebase'
// import R from 'ramda'

// import { firebaseUrl, fbConfig } from './../constants/firebaseConfig'
// import { FIREBASE_DEMO_PAYLOAD } from './actions'

// firebase.initializeApp(fbConfig)

// const db = firebase.database()
// const explosionDb = db.ref('explosion')
// const lightDb = db.ref('light')
// const soundDb = db.ref('sound')
// const dbs = [explosionDb, soundDb, lightDb]

// export const listenFirebase = () => {
// 	return dispatch => {
// 		R.forEach((ref) => {
// 		  const type = R.replace(/\//, '', ref.path.toString())
// 		  ref.on('value', (snapshot) => {
// 		    const data = { type, value: snapshot.val() }
// 		    let payload = null
// 		    let sensor = type
// 		    if (type === 'light' || type === 'sound') {
// 		    	payload = data.value.value
// 		    } else {
// 		    	payload = data.value.explosion
// 		    }
// 		    dispatch({ type: FIREBASE_DEMO_PAYLOAD, sensor, payload})
// 		  })
// 		}, dbs)
// 		return Promise.resolve()
// 	}
// }

// export const stopListenFirebase = () => {
// 	return dispatch => {
// 		R.forEach((ref) => { ref.off('value') }, dbs)
// 		return Promise.resolve()
// 	}
// }
