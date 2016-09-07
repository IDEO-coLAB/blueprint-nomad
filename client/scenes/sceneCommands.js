import { non, noff, ncap, con, coff, overlay, intro, activeScene, sceneCaption, pause, delay } from './../reducers/actions'
import { listenFirebase, stopListenFirebase } from './../reducers/firebase'
import { RESTING, MESSAGING } from './../constants/constants'

export let sceneCommands = [

	intro(false),
	overlay(false)

	// // Turn on solar array
	// ncap(0, 'Lots of sun here'),
	// pause(1),
	// ncap(1, 'Lots of sun here, too'),
	// [ non(0), non(1) ],

	// // ping
	// [ con('0-2'), con('1-2') ],
	// [ coff('0-2'), coff('1-2') ],
	// [ noff(0), ncap(0, null), noff(1), ncap(1, null) ],
	// [ non(2), ncap(2, 'Plenty of sun in the region') ],
	// pause(1),

	// // prediction node
	// [ con('2-3') ],
	// [ coff('2-3') ],
	// [ noff(2), ncap(2, null) ],


	// [ non(3), ncap(3, 'Predicting 100 Mw of energy output for the next 3 hours') ],
	// pause(1),
	// [ non(4), ncap(4, 'I know the current and anticipated power needs') ],
	// pause(1),

	// [ con('3-5'), con('4-5') ],
	// [ coff('3-5'), coff('4-5') ],
	// [ noff(3), ncap(3, null), noff(4), ncap(4, null) ],
	// [ non(5), ncap(5, 'Plenty of solar power. No additional power needed') ],
	// [ con('5-6') ],
	// [ coff('5-6') ],
	// [ non(6), ncap(6, 'Peaker Plant: I am off') ],
]

// export let sceneCommands = [

// 	overlay(true),
// 	intro(true),
// 	pause(1),
// 	intro(false),
// 	pause(1),
// 	overlay(false),

// 	sceneCaption("Don't make a scene"),

// 	ncap(0, "I'm about to send a message"),
// 	pause(1),
// 	[ non(0), con('0-6') ],
// 	[ noff(0), ncap(0, null) ],
// 	[ non(6), delay(ncap(6, 'I just got a message'), 0.2), coff('0-6') ],
// 	pause(2),
// 	ncap(6, "Now I'm going to send a message"),
// 	sceneCaption(),
// 	pause(0.5),
// 	sceneCaption('Ok, this is a different caption'),
// 	noff(0),
// 	pause(1),
// 	con('6-3'),
// 	coff('6-3'),
// 	[ non(3), delay(ncap(3, 'Now I got the message, wow! This is great'), 0.2) ],
// 	[ noff(6), ncap(6, null) ],

// 	overlay(true),
// 	pause(1),
// 	activeScene(1),
// 	overlay(false)

// ]
