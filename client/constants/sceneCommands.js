import { non, noff, ncap, con, coff, pause, delay } from './../reducers/actions'
import { RESTING, MESSAGING } from './constants'

export let sceneCommands = [

	[ non(0), delay(non(2), 0.5), ncap(0, 'new beam in transit'), delay(ncap(2, 'weather looks good'), 0.5) ],
	[ con('0-6'), con('2-6') ],
	[ coff('0-6'), coff('2-6') ],
	[ non(6), ncap(6, 'project is on schedule') ],
	[ con('6-3'), con('6-4'), con('6-5') ],
	[ coff('6-3'), coff('6-4'), coff('6-5') ],
	[ non(3), 
		non(4), 
		non(5), 
		ncap(3, 'project budget decreased'), 
		delay(ncap(4, 'engineers notified new beams coming'), 0.2), 
		delay(ncap(5, 'crane company scheduling vehicles'), 0.5)]
	

	



]