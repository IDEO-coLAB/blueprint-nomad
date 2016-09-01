import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import NodeComponent from './../components/NodeComponent'
import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'

function mapStateToProps(state, ownProps) {
  return {
    live: state.firebaseDemo
  }
}

class LiveSensorsContainer extends Component {
  render() {
    // console.log(this.props.live.light)
    return (
      <svg width="1920" height="1080" style={{background: '#efefef'}}>
      	<g>
      		<NodeComponent x={100} y={100} state={booleanToMessageState(this.props.live.light.changed)} id="live node" captionText="" caption={false} />
          <NodeComponent x={100} y={200} state={booleanToMessageState(this.props.live.sound.changed)} id="live node" captionText="" caption={false} />
          <NodeComponent x={300} y={150} state={booleanToMessageState(this.props.live.explosion.changed)} id="live node" captionText="" caption={false} />
  		  </g>
      </svg>
    )
  }
}

let booleanToMessageState = bool => {
  return bool? MESSAGING : RESTING
}

export default connect(mapStateToProps)(LiveSensorsContainer)
