import { setNodeState } from './../reducers/actions'
import { RESTING, MESSAGING } from './constants'

export let sceneCommands = [
	setNodeState(0, MESSAGING)
]