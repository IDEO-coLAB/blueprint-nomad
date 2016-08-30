import { SETTINGS } from './../constants/settings'
import { MESSAGING, RESTING } from './../constants/constants'


// scene command functions
// must return a function that takes dispatch
// as an argument. Must return promise.

// node assumed to be in current scene
// returns promise
export let non = (node) => {
	return setNodeState(node, MESSAGING, SETTINGS.timeouts.nodeMessaging*1000)
}

export let noff = (node) => {
	return setNodeState(node, RESTING, SETTINGS.timeouts.nodeResting*1000)
}

let setNodeState = (node, state, timeout) => {
	return dispatch => {
		dispatch({ type: SET_NODE_STATE, objId: node, state })
		return new Promise((resolve, reject) => {
			setInterval(() => {
				resolve()
			}, timeout)
		})
	}
}

export let ncap = (node, caption) => {
	return dispatch => {
		if (caption) {}
		dispatch({ type: SET_NODE_CAPTION, objId: node, caption})
		return Promise.resolve()
	}
}

export let con = (connection) => {
	return setConnectionState(connection, MESSAGING, SETTINGS.timeouts.connectionMessaging*1000)
}

export let coff = (connection) => {
	return setConnectionState(connection, RESTING, SETTINGS.timeouts.connectionResting*1000)
}

let setConnectionState = (connection, state, timeout) => {
	return dispatch => {
		dispatch({ type: SET_CONNECTION_STATE, objId: connection, state })
		return new Promise((resolve, reject) => {
			setInterval(() => {
				resolve()
			}, timeout)
		})
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


// redux reducer actions
export const SET_NODE_STATE = 'SET_NODE_STATE'
export const SET_NODE_CAPTION = 'SET_NODE_CAPTION'
export const SET_CONNECTION_STATE = 'SET_CONNECTION_STATE'
