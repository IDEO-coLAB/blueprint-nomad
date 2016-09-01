import R from 'ramda'

import { FIREBASE_DEMO_PAYLOAD } from './actions'

const initialState = {
	light: 0,
	sound: 0,
	explosion: false
}

// top level reducer
export let demoSceneReducer = function(appState=initialState, action) {
	let cloned = R.clone(appState)
	switch (action.type) {
		case FIREBASE_DEMO_PAYLOAD:
			cloned[action.sensor] = action.payload
			console.log(cloned)
			return cloned
		default:
			return appState
	}
}




