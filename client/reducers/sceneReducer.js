import R from 'ramda'

import { CONN_ALERT_ON, CONN_ON, CONN_OFF, NODE_ALERT_ON, NODE_ON, NODE_OFF } from './../constants/constants'
import {
	SET_NODE_STATE, SET_NODE_CAPTION, SET_CONNECTION_STATE,
	SET_OVERLAY, SET_INTRO, SET_ACTIVE_SCENE, SET_SCENE_CAPTION } from './actions'
import { initialScenes } from './sceneBuilder'

// top level reducer
export let sceneReducer = function(appState=initialScenes, action) {
	let cloned, obj = null
	switch (action.type) {

		case SET_INTRO:
			cloned = R.clone(appState)
			cloned.showIntro = action.show
			return cloned

		case SET_OVERLAY:
			cloned = R.clone(appState)
			cloned.showOverlay = action.show
			return cloned

		case SET_NODE_STATE:
			cloned = R.clone(appState)
			obj = getObject(cloned, cloned.activeScene, action.objId)
			obj.state = action.state
			return cloned

		case SET_CONNECTION_STATE:
			cloned = R.clone(appState)
			obj = getObject(cloned, cloned.activeScene, action.objId)
			obj.state = action.state
			return cloned

		case SET_NODE_CAPTION:
			cloned = R.clone(appState)
			obj = getObject(cloned, cloned.activeScene, action.objId)
			if (action.caption) {
				obj.showCaption = true
				obj.captionText = action.caption
			} else {
				obj.showCaption = false
			}
			return cloned

		case SET_ACTIVE_SCENE:
			cloned = R.clone(appState)
			cloned.activeScene = action.scene
			return cloned

		case SET_SCENE_CAPTION:
			cloned = R.clone(appState)
			let scene = cloned.scenes[cloned.activeScene]
			if (action.caption) {
				scene.showSceneCaption = true
				scene.sceneCaption = action.caption
			} else {
				scene.showSceneCaption = false
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

export let activateNodes = activations => {
	return dispatch => {
		let promises = R.map((fn) => {
			return fn(dispatch)
		}, activations)

		return Promise.all(promises).then(() => {
			return true
		})
	}
}

let getObject = (objects, sceneId, id) => {
	let scene = objects.scenes[sceneId]
	return R.find(R.propEq('id', id), scene.objects)
}
