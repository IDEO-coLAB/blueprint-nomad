import R from 'ramda'

import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING, NORMAL, ALERT } from './../constants/constants'
import { 
	SET_NODE_STATE, SET_NODE_CAPTION, SET_CONNECTION_STATE, 
	SET_OVERLAY, SET_INTRO, SET_ACTIVE_SCENE, SET_SCENE_CAPTION } from './../reducers/actions'

const SUN_THRESHOLD = 5000
const NODE_ACTIVATE_CONNECTION_TIMEOUT = 1000
const NODE_DEACTIVATE_TIMEOUT = 300
const CONNECTION_DEACTIVATE_TIMEOUT = 3000
const CONNECTION_ACTIVATE_NODE_TIMEOUT = 1000

class Node {
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

		this._activationState = []
	}

	setInputSize(n) {
		this._activationState = R.repeat(null, n)
	}

	setDispatch(d) {
		this.dispatch = d
	}

	dispatchState() {
		this.dispatch({ type: SET_NODE_STATE, payload: this.state })
	}

	activate(idx, status) {
		this._activationState[idx] = status
		
		let waiting = R.any(R.isNil, this._activationState)
		let partialAlert = (R.length(this._activationState) > 1) 
			&& R.not(waiting) 
			&& R.any(R.equals(ALERT))(this._activationState)
		let alert = R.all(R.equals(ALERT), this._activationState)

		if (alert) {
			this.state.status = ALERT
			this.state.caption = "It's cloudy everywhere"
			this.showCaption = true
			this.state.state = MESSAGING
		}

		else if (partialAlert) {
			this.state.caption = "It's partially cloudy"
			this.showCaption = true
			this.state.state = MESSAGING
		}

		else if (waiting) {
			this.state.caption = "Waiting for more messages..."
		}	

		this.dispatchState()

		let self = this
		setTimeout(() => {
			self.state.status = NORMAL
			self.state.showCaption = false
			self.state.state = RESTING

			let activationStateLength = R.length(self._activationState)
			self._activationState = R.repeat(null, activationStateLength)
			self.dispatchState()
		}, NODE_DEACTIVATE_TIMEOUT)

		// assuming that state.status isn't changed by the other timeout fxn
		setTimeout(() => {
			R.forEach((connection) => {
				connection.activate(self.state.status)
			}, self._outputs)
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
		// debugger
		setTimeout(() => {
			// debugger
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


// connections need input and output set
// nodes only need outputs set

const solar1 = new Node('solar1')
const solar2 = new Node('solar2')
const connection1 = new Connection('connection1')
const connection2 = new Connection('connection2')
const composite1 = new Node('composite1')
const prediction = new Node('prediction')
const connection3 = new Connection('connection3')

solar1.setInputSize(1)
solar1._outputs.push(connection1)
solar1.state.pos.x = 100
solar1.state.pos.y = 100

solar2.setInputSize(1)
solar2._outputs.push(connection2)
solar2.state.pos.x = 600
solar2.state.pos.y = 600

connection1._input = solar1
connection1._output = [0, composite1]

connection2._input = solar2
connection2._output = [1, composite1]

composite1.setInputSize(2)
composite1._outputs.push(connection3)
composite1.state.pos.x = 300
composite1.state.pos.y = 500

connection3._input = composite1
// // this connection is input 0 of prediction
connection3._output = [0, prediction]

prediction.setInputSize(1)
prediction.state.pos.x = 500
prediction.state.pos.y = 800


export const sceneObjects = [solar1, solar2, connection1, connection2, composite1, prediction, connection3]






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