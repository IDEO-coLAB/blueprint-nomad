import R from 'ramda'

import { sceneObjects as fullSceneObjects } from './../scenes/fullScene'
import { sceneObjects as threeNodeSceneObjects } from './../scenes/threeNodeScene'

let makeScene = sceneIn => {
	let objectList = R.map((obj) => {
		return obj.state
	}, sceneIn)

	return { objects: objectList }
}

export let initialScenes = {
	scenes: [ makeScene(threeNodeSceneObjects), makeScene(fullSceneObjects) ]
}




// nodes can have multiple inputs and multiple outputs
// connections can only have 1 input and 1 output
// for simplicity, we always use array to store inputs and outputs, even
// if there's only 1
// export const initialScenes = {
// 	showOverlay: true,
//  showIntro: true,
// 	activeScene: 0,
// 	scenes: [
// 		{
// 			// an object is either a node or a connection
// 			objects: [
// 				{
// 					id: 0,
// 					type: SCENE_NODE,
// 					state: RESTING,
// 					inputs: [],
// 					outputs: [1],
// 					pos: { x: 100, y: 200, rad: 30, strokeWidth: 26 },
//					caption: 'this is a speech bubble'
// 				},
// 				{
// 					id: 1,
// 					type: SCENE_CONNECTION,
// 					state: RESTING,
// 					inputs: [0],
// 					outputs: [2]
// 				},
// 			]
// 		}
// 	]
// }