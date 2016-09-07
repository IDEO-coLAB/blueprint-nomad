import R from 'ramda'


import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'
import { energyScene } from './../scenes/scenes'
import { sceneObjects } from './../scenes/sceneObjects'

// helpers for makeScene
// does the line have given nodeId as an output
let hasNodeAsInput = (sceneLine, nodeId)  => {
	return R.contains(nodeId, sceneLine[0])
}

let pluckInputs = R.pluck(0)

let makeScene = sceneIn => {
	let idx = 0
	let objectList = R.map((obj) => {
		return obj.state
	}, sceneIn)

	console.log(objectList)
	console.log(sceneObjects)
	return {
		objects: objectList,
		showSceneCaption: false,
		sceneCaption: ''
	}
}

export let initialScenes = {
	showOverlay: true,
	showIntro: true,
	activeScene: 0,
	scenes: [
		makeScene(sceneObjects)
	]
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