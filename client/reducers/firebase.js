'use strict'

import firebase from 'firebase'
import Particle from 'particle-api-js'
import R from 'ramda'

import { non, nalon, noff, ncap, con, calon, coff, overlay, intro, activeScene, sceneCaption, pause, delay } from './actions'
import { firebaseUrl, fbConfig } from './../constants/firebaseConfig'
import { particleConfig } from './../constants/particleConfig'
import { dispatchSceneCommands } from './sceneReducer'
import { FIREBASE_DEMO_PAYLOAD, FIREBASE_DEMO_RELAX, NOTIFY_PARTICLE } from './actions'

// Firebase
firebase.initializeApp(fbConfig)

const db = firebase.database()
const explosionDb = db.ref('explosion')
const lightDb = db.ref('light')
const soundDb = db.ref('sound')
const dbs = [explosionDb, soundDb, lightDb]

// Particle
const particle = new Particle()
const particleDevice = R.head(particleConfig.devices)


particle.login({ username: particleConfig.username, password: particleConfig.password })
	.then((result) => {
		console.log('Logged in to Particle')
	})
	.catch((err) => {
		console.error('Unable to log into Particle!')
	})

export const notifyParticle = () => {
	const fnArg = ''
	var fnPr = particle.callFunction({ deviceId: particleDevice.id, name: 'toggle', argument: fnArg, auth: particleDevice.token });
	return fnPr.then((result) => {
    console.log('Partcle PNR call succes:', result);
  })
  .catch((err) => {
    console.log('Partcle PNR error called:', err);
  })
}

// const pingCommands = [
// 	con('0-2'),
// 	pause(.1),
// 	non(0),
// 	pause(.1),
// 	noff(0),
// 	pause(0.9),
// 	non(2),
// 	coff('0-2'),
// 	pause(.1),
// 	noff(2)
// ]

// const alertCommands = [
// 	calon('0-2'),
// 	pause(.1),
// 	nalon(0),
// 	pause(.1),
// 	noff(0),
// 	pause(0.9),
// 	nalon(2, notifyParticle),
// 	coff('0-2'),
// 	pause(.1),
// 	noff(2)
// ]

export const listenFirebase = () => {
	return dispatch => {
		R.forEach((ref) => {
		  const type = R.replace(/\//, '', ref.path.toString())
		  ref.on('value', (snapshot) => {
		    const data = { type, value: snapshot.val() }
		    let payload = data.value.value
		    let sensor = type
		    let commands = pingCommands

				if (payload > 2000) {
					commands = alertCommands
				}

				// dispatchSceneCommands(commands)(dispatch)
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
