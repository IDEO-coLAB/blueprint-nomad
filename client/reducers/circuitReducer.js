import _ from 'underscore'
import q from 'q'

import { SWITCH } from '../constants/nodeTypes'
import { BOOL_OFF, BOOL_ON, BOOL_TRANSITION_OFF, BOOL_TRANSITION_ON } from '../constants/boolStates'
import { boolInvert }  from '../lib/bool'

const SWITCH_TOGGLE_ACTION = 'SWITCH_TOGGLE_ACTION'

// redux action
let switchToggledAction = function(circuitId, nodeId) {
  return {
    type: SWITCH_TOGGLE_ACTION,
    circuitId,
    nodeId
  }
}

// exported action creator
export let switchToggled = function(circuitId, nodeId) {
  return function(dispatch) {
    dispatch(switchToggledAction(circuitId, nodeId))
  }
}

let initialState = [
  {
    id: 0,
    type: SWITCH,
    state: BOOL_OFF,
    inputs: [],
    outputs: []
  }
]   

export let circuitReducer = function(state=initialState, action) {  
  switch (action.type) {
    case SWITCH_TOGGLE_ACTION:
      let nodeId = action.nodeId
      let newState = Object.assign({}, state)
      let toggled = boolInvert(newState[nodeId].state)
      newState[nodeId].state = toggled
      return newState
      


    default:
      return state
  }
}