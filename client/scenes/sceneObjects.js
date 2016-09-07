import R from 'ramda'

import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING, NORMAL, ALERT } from './../constants/constants'
import { 
	SET_NODE_STATE, SET_NODE_CAPTION, SET_CONNECTION_STATE, 
	SET_OVERLAY, SET_INTRO, SET_ACTIVE_SCENE, SET_SCENE_CAPTION } from './../reducers/actions'

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
			caption: 'this is a speech bubble',
			showCaption: false
		}

		this._outputs = []
		this.dispatch = null
	}

	setDispatch(d) {
		this.dispatch = d
	}

	dispatchState() {
		this.dispatch({ type: SET_NODE_STATE, payload: this.state })
	}

	setSun(val) {
		this.state.status = NORMAL
		if (val < SUN_THRESHOLD) {
			this.state.status = ALERT
		}

		this.dispatchState()
	}

	activate() {
		this.state.state = MESSAGING
		this.showCaption = true
		this.dispatchState()

		setTimeout(() => {
			R.forEach((connection) => {
				connection.activate()
			}, this._outputs)
		}, NODE_ACTIVATE_CONNECTION_TIMEOUT)

		setTimeout(() => {
			this.state.state = RESTING
			this.showCaption = false
			this.dispatchState()
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
			caption: 'this is a speech bubble',
			showCaption: false
		}

		this._outputs = []
		this.dispatch = null

		this._activationState = [null, null]
	}

	setDispatch(d) {
		this.dispatch = d
	}

	dispatchState() {
		this.dispatch({ type: SET_NODE_STATE, payload: this.state })
	}

	activate(idx, status) {
		this._activationState[idx] = status
		this._activate()
	}

	_activate() {

		let waiting = R.any(R.isNil, this._activationState)
		let halfAlert = R.not(waiting) && R.any(R.equals(ALERT))(this._activationState)
		let alert = R.all(R.equals(ALERT), this._activationState)

		if (alert) {
			this.state.status = ALERT
			this.state.caption = "It's cloudy everywhere"
			this.showCaption = true
			this.state.state = MESSAGING
		}

		else if (halfAlert) {
			this.state.caption = "It's partially cloudy"
			this.showCaption = true
			this.state.state = MESSAGING
		}

		else if (waiting) {
			this.state.caption = "Waiting for more messages..."
		}	

		this.dispatchState()

		this.state.showCaption = true

		setTimeout(() => {
			this.state.status = NORMAL
			this.state.showCaption = false
			this.state.state = RESTING
			this._activationState = [null, null]
			this.dispatchState()
		}, NODE_DEACTIVATE_TIMEOUT)

		// assuming that state.status isn't changed by the other timeout fxn
		setTimeout(() => {
			R.forEach((connection) => {
				connection.activate(this.state.status)
			}, this._outputs)
		}, NODE_ACTIVATE_CONNECTION_TIMEOUT)

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

		this._output = null
		this._input = null

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

		let self = this
		setTimeout(() => {
			const idx = self._output[0]
			const output = self._output[1]
			output.activate(idx, this.state.status)
		}, CONNECTION_ACTIVATE_NODE_TIMEOUT)

		setTimeout(() => {
			self.state.state = RESTING
			self.dispatchState()
		}, CONNECTION_DEACTIVATE_TIMEOUT)
	}
}


const solar1 = new Solar('solar1')
const solar2 = new Solar('solar2')
const connection1 = new Connection('connection1')
const connection2 = new Connection('connection2')
const composite = new Composite('composite')

solar1._outputs.push(connection1)
solar2._outputs.push(connection2)

solar2.state.pos.x = 600
solar2.state.pos.y = 600

connection1._output = [0, composite]
connection1._input = solar1

connection2._output = [1, composite]
connection2._input = solar2

composite.state.pos.x = 300
composite.state.pos.y = 500

export const sceneObjects = [solar1, solar2, connection1, connection2, composite]






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