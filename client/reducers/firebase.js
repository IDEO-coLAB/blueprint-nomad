import firebase from 'firebase'
import Particle from 'particle-api-js'
import R from 'ramda'

import { firebaseUrl, fbConfig } from './../constants/firebaseConfig'
import { particleConfig } from './../constants/particleConfig'
import { LIGHT_THRESHOLD, NORMAL, ALERT } from './../constants/constants'
import { FIREBASE_DEMO_PAYLOAD, FIREBASE_DEMO_RELAX, NOTIFY_PARTICLE } from './actions'

const LIGHT_0 = 'light-0'
const LIGHT_1 = 'light-1'

// Firebase
firebase.initializeApp(fbConfig)

const db = firebase.database()
const light0db = db.ref(LIGHT_0)
const light1db = db.ref(LIGHT_1)
const dbs = [light0db, light1db]

export const listenFirebase = (solar0, solar1) => {

	console.log(solar0.state.id)
	console.log(solar1.state.id)

	R.forEach((ref) => {
	  const type = R.replace(/\//, '', ref.path.toString())
	  ref.on('value', (snapshot) => {
	    const data = { type, value: snapshot.val() }
	    const payload = data.value.value
	    const sensor = type

			let status = NORMAL
			if (payload < LIGHT_THRESHOLD) {
				status = ALERT
			}

			switch (sensor) {
				case LIGHT_0:
					solar0.setStatus(0, status)
					break;
				case LIGHT_1:
					solar1.setStatus(0, status)
					break;
			}

	    console.log(sensor, payload, status)
	  })
	}, dbs)
	return Promise.resolve()
}

export const stopListenFirebase = () => {
	return dispatch => {
		R.forEach((ref) => { ref.off('value') }, dbs)
		return Promise.resolve()
	}
}
