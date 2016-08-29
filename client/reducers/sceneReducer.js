import R from 'ramda'

import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'
import { initialScenes } from './../constants/scenes'

// top level reducer
export let sceneReducer = function(appState=initialScenes, action) {
  return appState
}

// top level reducer function for a single circuit instance
// let circuitReducer = function(appState, action) {
//   switch (action.type) {
//     case NODE_SET_STATE_ACTION:
//       let nodeId = action.nodeId
//       let boolState = action.boolState
//       let newAppState = Object.assign({}, appState)
//       newAppState.allNodes = appState.allNodes.slice(0) // shallow copy array
//       newAppState.allNodes[nodeId] = Object.assign({}, appState.allNodes[nodeId])

//       newAppState.allNodes[nodeId].state = boolState
//       return addNodeToChangedNodes(newAppState, newAppState.allNodes[nodeId])
//     case PROPOGATE_CIRCUIT:
//       return propogateCircuit(appState)      
//     default:
//       return appState
//   }
// }






