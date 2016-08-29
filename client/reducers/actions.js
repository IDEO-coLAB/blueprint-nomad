// scene command functions
// must return a function that takes dispatch
// as an argument. Must return promise.

// node assumed to be in current scene
// returns promise
export let setNodeState = (node, state) => {
	return dispatch => {
		dispatch({ type: SET_NODE_STATE, objId: node, state })
		return Promise.resolve()
	}
}






// redux reducer actions
export const SET_NODE_STATE = 'SET_NODE_STATE'
export const SET_CONNECTION_STATE = 'SET_CONNECTION_STATE'
