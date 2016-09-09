import firebase from 'firebase'
import Particle from 'particle-api-js'
import R from 'ramda'

import { firebaseUrl, fbConfig } from './../constants/firebaseConfig'
import { FIREBASE_DEMO_PAYLOAD, FIREBASE_DEMO_RELAX, NOTIFY_PARTICLE } from './actions'

// Firebase
firebase.initializeApp(fbConfig)

// const db = firebase.database()
// const explosionDb = db.ref('explosion')
// const lightDb = db.ref('light')
// const soundDb = db.ref('sound')
// const dbs = [explosionDb, soundDb, lightDb]

export const listenFirebase = () => {
	return dispatch => {
		R.forEach((ref) => {
		  const type = R.replace(/\//, '', ref.path.toString())
		  ref.on('value', (snapshot) => {
		    const data = { type, value: snapshot.val() }
		    let payload = null
		    let sensor = type

		    if (type === 'light' || type === 'sound') {
		    	payload = data.value.value
		    }
		    dispatch({ type: FIREBASE_DEMO_PAYLOAD, sensor, payload})
		    // notifyParticle(true)

		    // toggle state's changed flag back to false. Components use
		    // that flag to render a temporary change when a new value
		    // comes in from firebase.
		    setTimeout(() => {
		    	dispatch({ type: FIREBASE_DEMO_RELAX, sensor })
		    	// notifyParticle()
		    }, 1000)
		  })
		}, dbs)
		return Promise.resolve()
	}
}

export const stopListenFirebase = () => {
	return dispatch => {
		R.forEach((ref) => { ref.off('value') }, dbs)
		return Promise.resolve()
	}
}

