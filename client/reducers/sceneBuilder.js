import R from 'ramda'


import { SCENE_NODE, SCENE_CONNECTION, CONN_OFF, NODE_OFF } from './../constants/constants'
import { energyScene, introScene } from './../scenes/scenes'

// helpers for makeScene
// does the line have given nodeId as an output
let hasNodeAsInput = (sceneLine, nodeId)  => {
	return R.contains(nodeId, sceneLine[0])
}

let pluckInputs = R.pluck(0)

let makeScene = sceneIn => {
	let idx = 0
	let nodeList = R.map((sceneLine) => {
		// look at all items in the scene list and find any nodes
		// that have this node as an output
		let inputs = pluckInputs(R.filter(hasNodeAsInput, sceneIn))

		return {
			id: idx++,
			type: SCENE_NODE,
			state: NODE_OFF,
			inputs,
			outputs: sceneLine[0],
			pos: { x: sceneLine[1][0], y: sceneLine[1][1] },
			showCaption: false,
			captionText: ''
		}
	}, sceneIn)

	let connectionList = R.map((node) => {
		return R.map((outputNodeId) => {
			return {
				id: String(node.id) + '-' + String(outputNodeId),
				type: SCENE_CONNECTION,
				state: CONN_OFF,
				inputs: [ node.id ],
				outputs: [ outputNodeId ]
			}
		}, node.outputs)
	}, nodeList)

	let objectList = R.flatten(R.concat(nodeList, connectionList))

	return {
		objects: objectList,
		showSceneCaption: false,
		sceneCaption: ''
	}
}

export let initialScenes = {
	showOverlay: false,
	showIntro: false,
	activeScene: 1,
	scenes: [
		makeScene(introScene),
		makeScene(energyScene),
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
// 					pos: { x: 100, y: 200 },
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