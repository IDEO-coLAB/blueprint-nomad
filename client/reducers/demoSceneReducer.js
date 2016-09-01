import R from 'ramda'

import { FIREBASE_DEMO_PAYLOAD, FIREBASE_DEMO_RELAX } from './actions'

const initialState = {
	light: {value: 0, changed: false },
	sound: {value: 0, changed: false },
	explosion: {value: false, changed: false }
}

// top level reducer
export let demoSceneReducer = function(appState=initialState, action) {
	let cloned = R.clone(appState)
	switch (action.type) {
		case FIREBASE_DEMO_PAYLOAD:
			cloned[action.sensor].value = action.payload
			cloned[action.sensor].changed = true
			return cloned
		case FIREBASE_DEMO_RELAX:
			cloned[action.sensor].changed = false
			return cloned
		default:
			return appState
	}
}




