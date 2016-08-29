import R from 'ramda'

import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'
import { SET_NODE_STATE, SET_CONNECTION_STATE } from './actions'
import { initialScenes } from './../constants/scenes'

// top level reducer
export let sceneReducer = function(appState=initialScenes, action) {
	switch (action.type) {
		case SET_NODE_STATE:
		case SET_CONNECTION_STATE: 
			let cloned = R.clone(appState)
			let obj = getObject(cloned, cloned.activeScene, action.objId)
			obj.state = action.state
			return cloned
		default:
			return appState
	}
}

export let dispatchSceneCommands = commandList => {
	return dispatch => {
		if (R.isEmpty(commandList)) { return Promise.resolve() }
		let headFxn = R.head(commandList)
		headFxn(dispatch).then(() => {
			return dispatchSceneCommands(R.tail(commandList))
		})
	}
}

let getObject = (objects, sceneId, id) => {
	let scene = objects.scenes[sceneId]
	return R.find(R.propEq('id', id), scene.objects)
}






