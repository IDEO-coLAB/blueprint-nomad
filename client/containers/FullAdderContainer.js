// Globals
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { findObjects } from '../reducers/circuitReducerHelpers'
import { setNodeState } from '../reducers/circuitReducer'
import CircuitContainer from '../containers/CircuitContainer'
import DecimalNumberComponent from '../components/DecimalNumberComponent'
import { BOOL_OFF, BOOL_ON, BOOL_TRANSITION_OFF, BOOL_TRANSITION_ON } from '../constants/boolStates'

const CIRCUIT_NAME = "fullAdder"

function mapStateToProps(state, ownProps) {
  return {
    circuits: state.circuits
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setState: function(node, boolState) {
      // note translation of node object to node id
      dispatch(setNodeState(CIRCUIT_NAME, node.nodeId, boolState) )
    }
  }
}

class FullAdderContainer extends Component {
  render() { 

    // circuit nodes for input switches, output led
    // let input0 = findObjects([0, 1, 2], this.props.circuits[CIRCUIT_NAME].allNodes)
    // let input1 = findObjects([7, 8, 9], this.props.circuits[CIRCUIT_NAME].allNodes)
    // let output = findObjects([3, 4, 5, 6], this.props.circuits[CIRCUIT_NAME].allNodes)

    return(   
      <div className="centered svg-width-small-gates svg-vertical-margin">
        <svg viewBox="0 0 1000 360">
          <g transform="translate(300,0)">
            <CircuitContainer circuitName={CIRCUIT_NAME} />
          </g>
        </svg>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullAdderContainer)