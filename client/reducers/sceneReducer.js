import R from 'ramda'

import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'
import { SET_NODE_STATE, SET_CONNECTION_STATE } from './actions'
import { initialScenes } from './sceneBuilder'

// top level reducer
export let sceneReducer = function(appState=initialScenes, action) {
	let cloned, obj = null
	switch (action.type) {
		case SET_NODE_STATE:
		case SET_CONNECTION_STATE: 
			let cloned = updateNodeState(appState, action.sceneIdx, action.payload)
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

// returns a copy of appstate, doesn't mutate appstate
let updateNodeState = (appState, sceneIdx, nodeState) => {
	let cloned = R.clone(appState)
	let nodes = cloned.scenes[sceneIdx].objects
	let nodeId = nodeState.id

	// remove node from list
	let filtered = R.filter((node) => {
		return node.id !== nodeId
	}, nodes)

	// add it back
	let added = R.concat(filtered, nodeState)
	cloned.scenes[sceneIdx].objects = added
	return cloned
}






