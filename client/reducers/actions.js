import R from 'ramda'
import { SETTINGS } from './../constants/settings'
import { MESSAGING, RESTING, DOM_EVENTS } from './../constants/constants'

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

let handleEvent = (resolveHandler) => {
	return (event) => {
		event.stopPropagation()
		return resolveHandler()
	}
}

let resolveOnClick = (resolveScene) => {
	let eventHandler
	return new Promise((resolveHandler) => {
			eventHandler = handleEvent(resolveHandler)
			return document.addEventListener('click', eventHandler)
		})
		.then(() => {
			document.removeEventListener('click', eventHandler)
			return resolveScene()
		})
}

let resolveOnAction = (action, resolve) => {
	console.log('Awaiting user action...')
	switch (action) {
		case 'click':
			return resolveOnClick(resolve)
		default:
			throw new Error('Unhandled action type: ', action)
	}
}

let resolveAfterDelay = (delay, resolve) => {
	return setTimeout(() => resolve(), delay*1000)
}

// node assumed to be in current scene
// returns promise
export let non = (node) => {
	return setNodeState(node, MESSAGING, SETTINGS.timeouts.nodeMessaging)
}

export let noff = (node) => {
	return setNodeState(node, RESTING, SETTINGS.timeouts.nodeResting)
}

let setNodeState = (node, state, delay) => {
	return dispatch => {
		dispatch({ type: SET_NODE_STATE, objId: node, state })
		return new Promise((resolve, reject) => {
			return resolveAfterDelay(delay, resolve)
		})
	}
}

export let ncap = (node, caption) => {
	return dispatch => {
		dispatch({ type: SET_NODE_CAPTION, objId: node, caption})
		return Promise.resolve()
	}
}

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

export let con = (connection) => {
	return setConnectionState(connection, MESSAGING, SETTINGS.timeouts.connectionMessaging)
}

export let coff = (connection) => {
	return setConnectionState(connection, RESTING, SETTINGS.timeouts.connectionResting)
}

let setConnectionState = (connection, state, delay) => {
	return dispatch => {
		dispatch({ type: SET_CONNECTION_STATE, objId: connection, state })
		return new Promise((resolve, reject) => {
			return resolveAfterDelay(delay, resolve)
		})
	}
}

export let pause = (delay) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			// If delay is a number, pause for the specified delay
			if (typeof(delay) === 'number') {
				return resolveAfterDelay(delay, resolve)
			}
			// Otherwise user interaction is required to resolve
			return resolveOnAction(DOM_EVENTS.CLICK, resolve)
		})
	}
}

export let delay = (command, delay) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			return resolveAfterDelay(delay, resolve)
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
