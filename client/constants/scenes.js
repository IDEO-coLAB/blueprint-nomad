import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './constants'

// nodes can have multiple inputs and multiple outputs
// connections can only have 1 input and 1 output
// for simplicity, we always use array to store inputs and outputs, even 
// if there's only 1
export const initialScenes = {
	activeScene: 0,
	scenes: [
		{	
			// an object is either a node or a connection
			objects: [
				{
					id: 0,
					type: SCENE_NODE,
					state: RESTING,
					inputs: [],
					outputs: [1],
					pos: { x: 100, y: 200 }
				},
				{
					id: 1,
					type: SCENE_CONNECTION,
					state: RESTING,
					inputs: [0],
					outputs: [2]
				},
				{
					id: 2,
					type: SCENE_NODE,
					state: RESTING,
					inputs: [1],
					outputs: [],
					pos: { x: 600, y: 600 }
				},
				{
					id: 3,
					type: SCENE_NODE,
					state: RESTING,
					inputs: [4],
					outputs: [5],
					pos: { x: 500, y: 200 }
				},
				{
					id: 4,
					type: SCENE_CONNECTION,
					state: RESTING,
					inputs: [2],
					outputs: [3]
				},
				{
					id: 5,
					type: SCENE_CONNECTION,
					state: RESTING,
					inputs: [0],
					outputs: [3]
				},
			]
		}
	]
}