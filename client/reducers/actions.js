import { SETTINGS } from './../constants/settings'
import {  CONN_ALERT_ON, CONN_ON, CONN_OFF, NODE_ALERT_ON, NODE_ON, NODE_OFF } from './../constants/constants'

// redux reducer actions
export const SET_NODE_STATE = 'SET_NODE_STATE'
export const SET_NODE_CAPTION = 'SET_NODE_CAPTION'
export const SET_CONNECTION_STATE = 'SET_CONNECTION_STATE'
export const SET_OVERLAY = 'SET_OVERLAY'
export const SET_INTRO = 'SET_INTRO'
export const SET_ACTIVE_SCENE = 'SET_ACTIVE_SCENE'
export const SET_SCENE_CAPTION = 'SET_SCENE_CAPTION'

export const FIREBASE_DEMO_PAYLOAD = 'FIREBASE_DEMO_PAYLOAD'
export const FIREBASE_DEMO_RELAX = 'FIREBASE_DEMO_RELAX'
export const NOTIFY_PARTICLE = 'NOTIFY_PARTICLE'


// scene command functions
// must return a function that takes dispatch
// as an argument. Must return promise.

// NODE ACTIONS

// returns promise
export let non = (nodeId) => {
	return setNodeState(nodeId, NODE_ON)
}

export let nalon = (nodeId) => {
	return setNodeState(nodeId, NODE_ALERT_ON)
}

export let noff = (nodeId) => {
	return setNodeState(nodeId, NODE_OFF)
}

let setNodeState = (nodeId, state) => {
	return dispatch => {
		dispatch({ type: SET_NODE_STATE, objId: nodeId, state })
		return Promise.resolve()
	}
}

export let ncap = (node, caption) => {
	return dispatch => {
		dispatch({ type: SET_NODE_CAPTION, objId: node, caption})
		return Promise.resolve()
	}
}

// CONNECTION ACTIONS

export let con = (connection) => {
	return setConnectionState(connection, CONN_ON)
}

export let calon = (connection) => {
	return setConnectionState(connection, CONN_ALERT_ON)
}

export let coff = (connection) => {
	return setConnectionState(connection, CONN_OFF)
}

let setConnectionState = (connection, state) => {
	return dispatch => {
		dispatch({ type: SET_CONNECTION_STATE, objId: connection, state })
		return Promise.resolve()
	}
}

// SCENES

export let overlay = (show) => {
	return dispatch => {
		dispatch({ type: SET_OVERLAY, show })
		return Promise.resolve()
	}
}

export let intro = (show) => {
	return dispatch => {
		dispatch({ type: SET_INTRO, show })
		return Promise.resolve()
	}
}

export let pause = (timeout) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setInterval(() => {
				resolve()
			}, timeout*1000)
		})
	}
}

export let delay = (command, delay) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setInterval(() => {
				resolve()
			}, delay*1000)
		}).then(() => {
			return command(dispatch)
		})
	}
}

export let activeScene = scene => {
	return dispatch => {
		dispatch({ type: SET_ACTIVE_SCENE, scene })
		return Promise.resolve()
	}
}

export let sceneCaption = caption => {
	return dispatch => {
		dispatch({ type: SET_SCENE_CAPTION, caption })
		return Promise.resolve()
	}
}
