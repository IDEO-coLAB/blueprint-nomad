import R from 'ramda'

import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING, NORMAL, ALERT } from './../constants/constants'
import { 
	SET_NODE_STATE, SET_NODE_CAPTION, SET_CONNECTION_STATE, 
	SET_OVERLAY, SET_INTRO, SET_ACTIVE_SCENE, SET_SCENE_CAPTION } from './../reducers/actions'
import { 
	NODE_ACTIVATE_CONNECTION_TIMEOUT, 
	NODE_DEACTIVATE_TIMEOUT, 
	CONNECTION_DEACTIVATE_TIMEOUT, 
	CONNECTION_ACTIVATE_NODE_TIMEOUT
} from './../constants/settings'
 
const SUN_THRESHOLD = 5000

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
		let allNormal = R.all(R.equals(NORMAL), this._activationState)

		debugger
		if (waiting) {
			return
		}

		else if (alert) {
			this.state.status = ALERT
			this.state.caption = "It's cloudy everywhere"
		}

		else if (partialAlert) {
			this.state.caption = "It's partially cloudy"
		}

		else if (allNormal) {
			this.state.caption = "It's sunny everywhere"	
		}

		this.showCaption = true
		this.state.state = MESSAGING

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

		// get a local copy of self.state.status because
		// above timeout might reset self.state.status before
		// this timeout fires
		let _cachedSelfStatus = self.state.status
		setTimeout(() => {
			R.forEach((connection) => {
				connection.activate(_cachedSelfStatus)
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
		setTimeout(() => {
			if (this.state.id === 'energyPredictionToNeedPeakerPlant' 
				|| this.state.id === 'energyMetersToNeedPeakerPlant') {
				debugger
			}
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
const solar1ToEnergyPrediction = new Connection('solar1ToEnergyPrediction')
const solar2ToEnergyPrediction = new Connection('solar2ToEnergyPrediction')
// const cloudPrediction = new Node('cloudPrediction')
const energyPrediction = new Node('energyPrediction')
// const cloudPreToEnergyPre = new Connection('cloudPreToEnergyPre')
const energyMeters = new Node('energyMeters')
const energyMetersToNeedPeakerPlant = new Connection('energyMetersToNeedPeakerPlant')
const energyPredictionToNeedPeakerPlant = new Connection('energyPredictionToNeedPeakerPlant')
const needPeakerPlant = new Node('needPeakerPlant')
const needPeakerToPeaker = new Connection('needPeakerToPeaker')
const peakerPlant = new Node('peakerPlant')

solar1.setInputSize(1)
solar1._outputs.push(solar1ToEnergyPrediction)
solar1.state.pos.x = 100
solar1.state.pos.y = 100

solar2.setInputSize(1)
solar2._outputs.push(solar2ToEnergyPrediction)
solar2.state.pos.x = 600
solar2.state.pos.y = 600

solar1ToEnergyPrediction._input = solar1
solar1ToEnergyPrediction._output = [0, energyPrediction]

solar2ToEnergyPrediction._input = solar2
solar2ToEnergyPrediction._output = [1, energyPrediction]

// cloudPrediction.setInputSize(2)
// cloudPrediction._outputs.push(cloudPreToEnergyPre)
// cloudPrediction.state.pos.x = 300
// cloudPrediction.state.pos.y = 500

// cloudPreToEnergyPre._input = cloudPrediction
// // this connection is input 0 of prediction
// cloudPreToEnergyPre._output = [0, energyPrediction]

energyPrediction.setInputSize(1)
energyPrediction._outputs.push(energyPredictionToNeedPeakerPlant)
energyPrediction.state.pos.x = 500
energyPrediction.state.pos.y = 800

energyPredictionToNeedPeakerPlant._input = energyPrediction
energyPredictionToNeedPeakerPlant._output = [0, needPeakerPlant]

energyMeters.setInputSize(1)
energyMeters._outputs.push(energyMetersToNeedPeakerPlant)
energyMeters.state.pos.x = 500
energyMeters.state.pos.y = 1000

energyMetersToNeedPeakerPlant._input = energyMeters
energyMetersToNeedPeakerPlant._output = [1, needPeakerPlant]

needPeakerPlant.setInputSize(2)
needPeakerPlant._outputs.push(needPeakerToPeaker)
needPeakerPlant.state.pos.x = 700
needPeakerPlant.state.pos.y = 1000

needPeakerToPeaker._input = needPeakerPlant
needPeakerToPeaker._output = [0, peakerPlant]

peakerPlant.setInputSize(1)
peakerPlant.state.pos.x = 1100
peakerPlant.state.pos.y = 1000

export const sceneObjects = [
	solar1, 
	solar2,
	solar1ToEnergyPrediction,
	solar2ToEnergyPrediction,
	energyPrediction,
	energyPredictionToNeedPeakerPlant,
	energyMeters,
	energyMetersToNeedPeakerPlant,
	needPeakerPlant,
	needPeakerToPeaker,
	peakerPlant
]






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