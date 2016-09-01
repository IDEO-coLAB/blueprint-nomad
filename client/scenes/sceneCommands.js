import { non, noff, ncap, con, coff, overlay, intro, activeScene, sceneCaption, pause, delay } from './../reducers/actions'
import { listenFirebase, stopListenFirebase } from './../reducers/firebase'
import { RESTING, MESSAGING } from './../constants/constants'

export let sceneCommands = [
	overlay(true),
	overlay(false),
	listenFirebase(),
	pause(10),
	stopListenFirebase()

	
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
