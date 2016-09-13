import R from 'ramda'

import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING, NORMAL, ALERT, PARTIAL_ALERT } from './../constants/constants'
import {
	SET_NODE_STATE, SET_NODE_CAPTION, SET_CONNECTION_STATE,
	SET_OVERLAY, SET_INTRO, SET_ACTIVE_SCENE, SET_SCENE_CAPTION } from './../reducers/actions'
import {
	NODE_ACTIVATE_CONNECTION_TIMEOUT,
	NODE_DEACTIVATE_TIMEOUT,
	CONNECTION_DEACTIVATE_TIMEOUT,
	CONNECTION_ACTIVATE_NODE_TIMEOUT
} from './../constants/settings'

import { setLed } from './../utils/led'

//
const LAST_NODE_ID = 'energyPrediction'

const isNotSolar = (id) => {
	return !R.contains(id, ['solar1', 'solar2'])
}

// used by objects to know which redux state tree to modify
let sceneIdx = 0

// Func to replay the scene
let replay = null

export const setupObjects = (replayFn) => {
	// Our replay function
	replay = replayFn

	R.forEach((n) => {
		setLed(n, 0, 0)
	}, R.range(0, 7))
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, 2000)
	})
}

export const ledMap = {
	solar1: 3,
	solar2: 1,
	energyPrediction: 0,
	energyMeters: 4,
	needPeakerPlant: 2,
	peakerPlant: 6
}

const SUN_THRESHOLD = 5000

class Node {
	constructor(id, captions, icon=null) {
		this.state = {
			id,
			icon: icon,
			status: NORMAL,
			state: RESTING,
			type: SCENE_NODE,
			showCaption: false,
			caption: captions.NORMAL,
			pos: { x:null, y:null, rad:28, strokeWidth:10 },
			inputCount: () => this._activationState.length,
		}

		this._outputs = []
		this._captions = captions
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
		this.dispatch({ type: SET_NODE_STATE, sceneIdx: sceneIdx, payload: this.state })
	}

	setInputStatus(idx, status) {
		this._activationState[idx] = status
	}

	setSelfStatus(status) {
		this.state.status = status
		if (status == ALERT) {
			setLed(ledMap[this.state.id], 1, 2)
			this.state.caption = this._captions[ALERT]
		}

		if (status == NORMAL) {
			// node always turns this off directly when state goes
			// from MESSAGING to RESTING (state not status)
			// setLed(ledMap[this.state.id], 0, 1)
			this.state.caption = this._captions[NORMAL]
		}
	}

	activate(idx=null, status=null) {
		if (R.is(Number, idx) && R.is(String, status)) {
			this._activationState[idx] = status
		}

		let waiting = (R.length(this._activationState) > 1) && R.any(R.isNil, this._activationState)
		// let waiting = R.any(R.isNil, this._activationState)
		let partialAlert = (R.length(this._activationState) > 1)
			&& R.not(waiting)
			&& R.any(R.equals(ALERT))(this._activationState)
		let alert = R.all(R.equals(ALERT), this._activationState)
		let allNormal = R.all(R.equals(NORMAL), this._activationState)

		if (waiting) {
			// this.state.state = MESSAGING
			this.state.showCaption = true
			this.state.caption = "Message received"
			this.dispatchState()

			let self = this
			setTimeout(() => {
				self.state.showCaption = false
				// self.state.state = RESTING
				self.dispatchState()

			}, NODE_DEACTIVATE_TIMEOUT)
			return
		}

		if (alert) {
			this.setSelfStatus(ALERT)
			this.state.caption = this._captions[ALERT]
		}

		else if (partialAlert) {
			this.setSelfStatus(ALERT)
			this.state.caption = this._captions[PARTIAL_ALERT]
		}

		else if (allNormal) {
			this.state.caption = this._captions[NORMAL]
			setLed(ledMap[this.state.id], 1, 1)
			this.setSelfStatus(NORMAL)
		}

		this.state.showCaption = true
		this.state.state = MESSAGING

		this.dispatchState()

		let self = this

		// deactivate the node
		setTimeout(() => {
			self.setSelfStatus(NORMAL)
			self.state.showCaption = false
			self.state.state = RESTING

			let activationStateLength = R.length(self._activationState)
			self._activationState = R.repeat(null, activationStateLength)
			self.dispatchState()

			if (isNotSolar(this.state.id)) {
				setLed(ledMap[this.state.id], 1, 0)
			}

			// If the last node is shutting down, replay the scene
			if ((self.state.id === LAST_NODE_ID) && replay) {
				replay()
			}

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

class InteractiveNode extends Node {
	constructor(id, captions, icon) {
		super(id, captions, icon)
		this.state.state = MESSAGING
		this.state.showCaption = true
	}

	setSelfStatus(status) {
		this.state.status = status

		if (status == ALERT) {
			setLed(ledMap[this.state.id], 1, 4)
		}

		if (status == NORMAL) {
			setLed(ledMap[this.state.id], 1, 3)
		}

		this.state.caption = this._captions[status]
		this.dispatchState()
	}

	activate(idx=null, status=null) {
		let self = this
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
		this.dispatch({ type: SET_CONNECTION_STATE, sceneIdx: sceneIdx, payload: this.state })
	}

	setStatus(status) {
		this.state.status = status
	}

	activate(status=null) {
		if (status) {
			this.state.status = status
		}
		this.state.state = MESSAGING
		this.dispatchState()

		let self = this
		setTimeout(() => {
			const idx = self._output[0]
			const output = self._output[1]
			output.activate(idx, self.state.status)
		}, CONNECTION_ACTIVATE_NODE_TIMEOUT)

		setTimeout(() => {
			self.state.state = RESTING
			self.dispatchState()
		}, CONNECTION_DEACTIVATE_TIMEOUT)
	}
}


// connections need input and output set
// nodes only need outputs set

const SOLAR_ICON = 'icon_solar_panel'
const SMART_METER_ICON = 'icon_smart_meters'
const PEAKER_ICON = 'icon_peaker_plant'

let solar1captions = {}
solar1captions[NORMAL] = 'All sunny here 😎'
solar1captions[ALERT] = 'Less sun at this panel 🙁'

let solar2captions = {}
solar2captions[NORMAL] = 'All sunny here 😎'
solar2captions[ALERT] = 'Less sun at this panel 🙁'

let energyPredictionCaptions = {}
energyPredictionCaptions[NORMAL] = 'Prediction: Energy output is high ☀️'
energyPredictionCaptions[PARTIAL_ALERT] = 'Prediciton: Energy output to drop by 50%  🌤'
energyPredictionCaptions[ALERT] = 'Prediciton: Energy output to drop by 100% 🌥'

let energyMetersCaptions = {}
energyMetersCaptions[NORMAL] = 'Meters: Load is low'
energyMetersCaptions[ALERT] = 'Meters: Load is high!'

let needPeakerPlantCaptions = {}
needPeakerPlantCaptions[NORMAL] = 'Peaker Monitor: No need for the Peaker'
needPeakerPlantCaptions[PARTIAL_ALERT] = 'Peaker Monitor: May need the peaker plant soon'
needPeakerPlantCaptions[ALERT] = 'Peaker Monitor: Fire up the Peaker!'

let peakerCaptions = {}
peakerCaptions[NORMAL] = 'Peaker: I am off',
peakerCaptions[ALERT] = 'Peaker: I am turning on!'


const solar1 = new InteractiveNode('solar1', solar1captions, SOLAR_ICON)
const solar1ToEnergyPrediction = new Connection('solar1ToEnergyPrediction')

const solar2 = new InteractiveNode('solar2', solar2captions, SOLAR_ICON)
const solar2ToEnergyPrediction = new Connection('solar2ToEnergyPrediction')

const energyPrediction = new Node('energyPrediction', energyPredictionCaptions)

solar1.setInputSize(1)
solar1._outputs.push(solar1ToEnergyPrediction)
solar1.state.pos.x = 240
solar1.state.pos.y = 360

solar2.setInputSize(1)
solar2._outputs.push(solar2ToEnergyPrediction)
solar2.state.pos.x = 1350
solar2.state.pos.y = 876

solar1ToEnergyPrediction._input = solar1
solar1ToEnergyPrediction._output = [0, energyPrediction]

solar2ToEnergyPrediction._input = solar2
solar2ToEnergyPrediction._output = [1, energyPrediction]

energyPrediction.setInputSize(2)
energyPrediction.state.pos.x = 1200
energyPrediction.state.pos.y = 159

export const sceneObjects = [
	solar1,
	solar2,
	solar1ToEnergyPrediction,
	solar2ToEnergyPrediction,
	energyPrediction
]
