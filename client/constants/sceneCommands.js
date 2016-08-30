import { nodeOn, nodeOff, connectionOn, connectionOff, pause, delay } from './../reducers/actions'
import { RESTING, MESSAGING } from './constants'

export let sceneCommands = [
	[ nodeOn(0), nodeOn(1) ],
	[ connectionOn('0-6'), delay(connectionOn('1-6'), 0.3)],
	[ connectionOff('0-6'), connectionOff('1-6'), nodeOff(0), nodeOff(1)],
	[ nodeOn(6), connectionOn('6-4'), delay(connectionOn('6-5'), 0.3), nodeOn(2)],
	[ connectionOff('6-4'), connectionOff('6-5'), nodeOff(6) ],
	[ nodeOn(4), delay(nodeOn(5), 0.3)]

	

	



]