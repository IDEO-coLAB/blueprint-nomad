import { non, noff, ncap, con, coff, overlay, intro, activeScene, sceneCaption, pause, delay } from './../reducers/actions'
import { RESTING, MESSAGING } from './../constants/constants'

export let sceneCommands = [
	
	overlay(true),
	intro(true),
	pause(1),
	intro(false),
	pause(1),
	overlay(false),

	sceneCaption("Don't make a scene"),

	ncap(0, "I'm about to send a message"),
	pause(1),
	[ non(0), con('0-6') ],
	[ noff(0), ncap(0, null) ],
	[ non(6), delay(ncap(6, 'I just got a message'), 0.2), coff('0-6') ],
	pause(2),
	ncap(6, "Now I'm going to send a message"),
	sceneCaption(),
	pause(0.5),
	sceneCaption('Ok, this is a different caption'),
	noff(0),
	pause(1),
	con('6-3'),
	coff('6-3'),
	[ non(3), delay(ncap(3, 'Now I got the message, wow! This is great'), 0.2) ],
	[ noff(6), ncap(6, null) ],

	overlay(true),
	pause(1),
	activeScene(1),
	overlay(false)



	// [ non(0), delay(non(2), 0.5), ncap(0, 'new beam in transit'), delay(ncap(2, 'weather looks good'), 0.5) ],
	// [ con('0-6'), con('2-6') ],
	// [ coff('0-6'), coff('2-6') ],
	// [ non(6), ncap(6, 'project is on schedule') ],
	// [ con('6-3'), con('6-4'), con('6-5') ],
	// [ coff('6-3'), coff('6-4'), coff('6-5') ],
	// [ non(3), 
	// 	non(4), 
	// 	non(5), 
	// 	ncap(3, 'project budget decreased'), 
	// 	delay(ncap(4, 'engineers notified new beams coming'), 0.2), 
	// 	delay(ncap(5, 'crane company scheduling vehicles'), 0.5)]
	

	//end of scene 0

	// overlayOn()
	// pause(1)
	// introOn(1)
	// setScene(1)
	// pause(5)
	// [ introOff(1), overlayOff()] 
	// 

	



]
