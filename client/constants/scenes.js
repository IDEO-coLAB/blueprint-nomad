import R from 'ramda'


import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './constants'
import { constructionScene } from './constructionScene'

let makeScene = sceneIn => {
	let idx = 0
	let nodeList = R.map((sceneLine) => {
		return {
			id: idx++,
			type: SCENE_NODE,
			state: RESTING,
			inputs: sceneLine[0],
			outputs: sceneLine[1],
			pos: { x: sceneLine[2][0], y: sceneLine[2][1] }
		}
	}, sceneIn)

	let connectionList = R.map((node) => {
		return R.map((outputNodeId) => {
			return {
				id: String(node.id) + '-' + String(outputNodeId),
				type: SCENE_CONNECTION,
				state: RESTING,
				inputs: [ node.id ],
				outputs: [ outputNodeId ]
			}
		}, node.outputs)
	}, nodeList)

	let objectList = R.flatten(R.concat(nodeList, connectionList))
	console.log(objectList)
	return objectList
}

export let initialScenes = {
	activeScene: 0,
	scenes: [{ objects: makeScene(constructionScene) }]
}


// nodes can have multiple inputs and multiple outputs
// connections can only have 1 input and 1 output
// for simplicity, we always use array to store inputs and outputs, even 
// if there's only 1
// export const initialScenes = {
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
// 					pos: { x: 100, y: 200 }
// 				},
// 				{
// 					id: 1,
// 					type: SCENE_NODE,
// 					state: RESTING,
// 					inputs: [],
// 					outputs: [1],
// 					pos: { x: 100, y: 200 }
// 				},
// 				{
// 					id: 2,
// 					type: SCENE_NODE,
// 					state: RESTING,
// 					inputs: [],
// 					outputs: [1],
// 					pos: { x: 100, y: 200 }
// 				},
// 				{
// 					id: 3,
// 					type: SCENE_NODE,
// 					state: RESTING,
// 					inputs: [],
// 					outputs: [1],
// 					pos: { x: 100, y: 200 }
// 				},
// 				{
// 					id: 4,
// 					type: SCENE_NODE,
// 					state: RESTING,
// 					inputs: [],
// 					outputs: [1],
// 					pos: { x: 100, y: 200 }
// 				},
// 				{
// 					id: 5,
// 					type: SCENE_NODE,
// 					state: RESTING,
// 					inputs: [],
// 					outputs: [1],
// 					pos: { x: 100, y: 200 }
// 				},
// 				{
// 					id: 6,
// 					type: SCENE_NODE,
// 					state: RESTING,
// 					inputs: [],
// 					outputs: [1],
// 					pos: { x: 100, y: 200 }
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