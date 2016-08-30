import { non, noff, con, coff, pause, delay } from './../reducers/actions'
import { RESTING, MESSAGING } from './constants'

export let sceneCommands = [
	[ non(0), non(1) ],
	[ con('0-6'), delay(con('1-6'), 0.3)],
	[ coff('0-6'), coff('1-6'), noff(0), noff(1)],
	[ non(6), con('6-4'), delay(con('6-5'), 0.3), non(2)],
	[ coff('6-4'), coff('6-5'), noff(6) ],
	[ non(4), delay(non(5), 0.3)]

	

	



]