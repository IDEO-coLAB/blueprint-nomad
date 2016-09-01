import { non, noff, ncap, con, coff, overlay, intro, activeScene, sceneCaption, pause, delay } from './../reducers/actions'
import { RESTING, MESSAGING } from './../constants/constants'

export let sceneCommands = [

	// overlay(true),
	// intro(true),
	// pause(1),
	intro(false),
	// pause(1),
	overlay(false),


	// Turn on solar array
	ncap(0, 'Lots of sun here'),
	pause(1),
	ncap(1, 'Lots of sun here, too'),
	[ non(0), non(1) ],

	// ping
	[ con('0-2'), con('1-2') ],
	[ coff('0-2'), coff('1-2') ],
	[ noff(0), ncap(0, null), noff(1), ncap(1, null) ],
	[ non(2), ncap(2, 'Plenty of sun in the region') ],
	pause(1),

	// prediction node
	[ con('2-3') ],
	[ coff('2-3') ],
	[ noff(2), ncap(2, null) ],


	[ non(3), ncap(3, 'Predicting 100 Mw of energy output for the next 3 hours') ],
	pause(1),
	[ non(4), ncap(4, 'I know the current and anticipated power needs') ],
	pause(1),

	[ con('3-5'), con('4-5') ],
	[ coff('3-5'), coff('4-5') ],
	[ noff(3), ncap(3, null), noff(4), ncap(4, null) ],
	[ non(5), ncap(5, 'Plenty of solar power. No additional power needed') ],
	pause(1),
	[ non(6), ncap(6, 'Peaker Plant: I am off') ],


]
