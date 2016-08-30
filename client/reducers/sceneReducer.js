import R from 'ramda'

import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'
import { SET_NODE_STATE, SET_NODE_CAPTION, SET_CONNECTION_STATE } from './actions'
import { initialScenes } from './../constants/scenes'

// top level reducer
export let sceneReducer = function(appState=initialScenes, action) {
	let cloned, obj = null
	switch (action.type) {
		case SET_NODE_STATE:
		case SET_CONNECTION_STATE: 
			cloned = R.clone(appState)
			obj = getObject(cloned, cloned.activeScene, action.objId)
			obj.state = action.state
			return cloned
		case SET_NODE_CAPTION: 
			cloned = R.clone(appState)
			obj = getObject(cloned, cloned.activeScene, action.objId)
			if (action.caption) {
				obj.caption = true
				obj.captionText = action.caption
			} else {
				obj.caption = false
			}
			return cloned
		default:
			return appState
	}
}

export let dispatchSceneCommands = commandList => {
	return dispatch => {
		recursiveDispatchSceneCommands(dispatch, commandList)
	}
}

// returns promise
let recursiveDispatchSceneCommands = (dispatch, commandList) => {
	if (R.isEmpty(commandList)) { return Promise.resolve() }
	
	let head = R.head(commandList)
	let tail = R.tail(commandList)

	// array means do things simultaneously
	if (R.isArrayLike(head)) {
		let promises = R.map((fn) => {
			return fn(dispatch)
		}, head)

		return Promise.all(promises).then(() => {
			return recursiveDispatchSceneCommands(dispatch, tail)
		})
	}

	return head(dispatch).then(() => {
		return recursiveDispatchSceneCommands(dispatch, tail)
	})
}

let getObject = (objects, sceneId, id) => {
	let scene = objects.scenes[sceneId]
	return R.find(R.propEq('id', id), scene.objects)
}






