import R from 'ramda'

const SUN_THRESHOLD = 5000
const NODE_ACTIVATE_CONNECTION_TIMEOUT = 1000
const NODE_DEACTIVATE_TIMEOUT = 300
const CONNECTION_DEACTIVATE_TIMEOUT = 1000
const CONNECTION_ACTIVATE_NODE_TIMEOUT = 1000


class Solar {
	constructor(id) {
		this.state = {
			id,
			type: SCENE_NODE,
			status: NORMAL,
			state: RESTING,
			pos: { x: 100, y: 200, rad: 30, strokeWidth: 26 },
			caption: 'this is a speech bubble'
		}

		this.outputs = []
		this.dispatch = null
	}

	setDispatch(d) {
		this.dispatch = d
	}

	dispatchState() {
		this.dispatch({ type: SET_NODE_STATE, payload: this.state })
	}

	setSun(val) {
		this.state.status = CLOUDY
		if (val > SUN_THRESHOLD) {
			this.state.status = SUNNY
		}

		dispatchState()
	}

	activate() {
		this.state = MESSAGING
		dispatchState()

		setTimeout(() => {
			R.foreach((connection) => {
				connection.activate()
			}, this.outputs)
		}, NODE_ACTIVATE_CONNECTION_TIMEOUT)

		setTimeout(() => {
			this.state = RESTING
			dispatchState()
		}, NODE_DEACTIVATE_TIMEOUT)
	}
}

class Composite {
	constructor(id) {
		this.state = {
			id,
			type: SCENE_NODE,
			status: NORMAL,
			state: RESTING,
			pos: { x: 100, y: 200, rad: 30, strokeWidth: 26 },
			caption: 'this is a speech bubble'
		}

		this.outputs = []
		this.dispatch = null

		this._activationState = [null, null]
	}

	setDispatch(d) {
		this.dispatch = d
	}

	dispatchState() {
		this.dispatch({ type: SET_NODE_STATE, payload: this.state })
	}

	// _activate()

	activateLeft(status) {
		this.activationState[0] = status
		this._activate()
	}

	activateRight(status) {
		this.activationState[0] = status
		this._activate()
	}



}




class Connection {
	constructor(id) {
		this.state = {
			id,
			type: SCENE_CONNECTION,
			status: NORMAL,
			state: RESTING,
		}

		this.output = null

		this.dispatch = null
	}

	setDispatch(d) {
		this.dispatch = d
	}

	dispatchState() {
		this.dispatch({ type: SET_CONNECTION_STATE, payload: this.state })
	}

	activate(status) {
		this.state.status = status
		this.state.state = MESSAGING
		this.dispatchState()

		setTimeout(() => {
			this.output.activate(this.state.status)
		}, CONNECTION_ACTIVATE_NODE_TIMEOUT)

		setTimeout(() => {
			this.state.state = RESTING
			this.dispatchState()
		}, CONNECTION_DEACTIVATE_TIMEOUT)
	}
}

let 




// nodes can have multiple inputs and multiple outputs
// connections can only have 1 input and 1 output
// for simplicity, we always use array to store inputs and outputs, even
// if there's only 1
// export const initialScenes = {
// 	showOverlay: true,
//  showIntro: true,
// 	activeScene: 0,
// 	scenes: [
// 		{
// 			// an object is either a node or a connection
// 			objects: [
// 				{
// 					id: 0,
// 					type: SCENE_NODE,
// 					state: RESTING,
// 					inputs: [],
// 					outputs: [1],
// 					pos: { x: 100, y: 200, rad: 30, strokeWidth: 26 },
//					caption: 'this is a speech bubble'
// 				},
// 				{
// 					id: 1,
// 					type: SCENE_CONNECTION,
// 					state: RESTING,
// 					inputs: [0],
// 					outputs: [2]
// 				},
// 			]
// 		}
// 	]
// }