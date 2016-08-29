import { nodeOn, nodeOff, connectionOn, connectionOff } from './../reducers/actions'
import { RESTING, MESSAGING } from './constants'

export let sceneCommands = [
	nodeOn(0),
	[connectionOn(4), connectionOn(1), connectionOn(5)],
	[connectionOff(4), connectionOff(1)],
	connectionOn(5),
	connectionOff(5)
	// nodeOn(2),
	// connectionOn(4),
	// connectionOff(4),
	// nodeOff(2),
	// nodeOn(3),
	// connectionOn(5),
	// connectionOff(5),
	// nodeOff(3),
	// connectionOn(5)
]