import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import { NODE_ALERT_ON, NODE_ON, NODE_OFF, SCENE_CONNECTION } from './../constants/constants'
import { SETTINGS } from './../constants/settings'
import SpeechBubbleComponent from './SpeechBubbleComponent'
import { con, calon, non, nalon, noff } from './../reducers/actions'

const isConnection = R.propEq('type', SCENE_CONNECTION)

const NODE_STATES = {
  AVAILABLE: 'AVAILABLE',
  ACTIVATING: 'ACTIVATING',
  DEACTIVATING: 'DEACTIVATING'
}

function mapStateToProps(state) {
  return {
    sceneConnections: R.filter(isConnection, state.scenes.scenes[state.scenes.activeScene].objects)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    propagateToConnections: (connections, isAlert) => {
      R.forEach((connection) => {
        const func = isAlert ? calon(connection.id) : con(connection.id)
        dispatch(func)
      }, connections)
    },
    deactivate: (nodeId) => {
      dispatch(noff(nodeId))
    },
    activate: (nodeId, isAlert) => {
      const func = isAlert ? nalon(nodeId) : non(nodeId)
      dispatch(func)
    }
  }
}

const speechBubbleOffset = { x: 50, y: -50 }

const styleOn = {
  fill: "#53BCCF",
  transition: `fill ${SETTINGS.timeouts.nodeOn/1000}s`
}

const styleAlertOn = {
  fill: "#e36666",
  transition: `fill ${SETTINGS.timeouts.nodeOn/1000}s`
}

const styleOff = {
  fill: "#CFD2D3",
  transition: `fill ${SETTINGS.timeouts.nodeOff/1000}s`
}

class NodeComponent extends Component {

  constructor () {
    super()
    this.connections = null
    this._isAlert = false
    this._currentState = NODE_STATES.AVAILABLE
    this.style = styleOff
  }

  componentDidUpdate(prevProps) {
    const id = this.props.node.id

    const connections = R.filter((conn) => {
      return R.contains(id, conn.inputs)
    }, this.props.sceneConnections)

    const prevNodeState = prevProps.node.state

    const wasOff = prevNodeState === NODE_OFF
    const wasOn = prevNodeState !== NODE_OFF

    const nowOff = this.props.node.state === NODE_OFF
    const nowOn = this.props.node.state !== NODE_OFF

    if (wasOff && nowOn) {
      if (this._currentState !== NODE_STATES.AVAILABLE) return
      this._currentState = NODE_STATES.ACTIVATING

      this._isAlert = R.equals(this.props.node.state, NODE_ALERT_ON)
      this.props.activate(id, this._isAlert)
      this.style = this._isAlert ? styleAlertOn : styleOn
    }
    else if (wasOn && nowOn) {
      if (this._currentState !== NODE_STATES.ACTIVATING) return
      this._currentState = NODE_STATES.ACTIVATING

      setTimeout(() => {
        this.props.deactivate(id)
        this.style = styleOff
      }, SETTINGS.timeouts.nodeOn)
    }
    else if (wasOn && nowOff) {
      if (this._currentState === NODE_STATES.DEACTIVATING) return
      this._currentState = NODE_STATES.DEACTIVATING

      setTimeout(() => {
        this.props.propagateToConnections(connections, this._isAlert)
        this._currentState = NODE_STATES.AVAILABLE
        this._isAlert = false
      }, SETTINGS.timeouts.nodeOff)
    }
  }

  render() {
    const node = this.props.node
    const id = node.id

    const bubbleX = node.pos.x + speechBubbleOffset.x
    const bubbleY = node.pos.y + speechBubbleOffset.y

    return (
    	<g>
    		<SpeechBubbleComponent x={bubbleX} y={bubbleY} width="100" height="50" text={node.captionText} visible={node.showCaption}/>
	    	<g>
		      <circle style={this.style} cx={node.pos.x} cy={node.pos.y} r="30" />
        </g>
		  </g>
    )
  }
}

let renderSpeechBubble = (text, x, y) => {
	if (R.isEmpty(text) || R.isNil(text)) { return }
	return (
		<SpeechBubbleComponent x={x} y={y} width="100" height="50" text={text}/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeComponent)
