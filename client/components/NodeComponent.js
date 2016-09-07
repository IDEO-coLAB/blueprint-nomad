import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import { NODE_ALERT_ON, NODE_ON, NODE_OFF, SCENE_CONNECTION } from './../constants/constants'
import { SETTINGS } from './../constants/settings'
import SpeechBubbleComponent from './SpeechBubbleComponent'
import { con, calon, non, nalon, noff } from './../reducers/actions'

const isConnection = R.propEq('type', SCENE_CONNECTION)

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
        console.log('NODE: dispatching to turn on connection')
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

const on = {
  fill: "#53BCCF",
  transition: `fill ${SETTINGS.timeouts.nodeOn/1000}s`
}

const alertOn = {
  fill: "#e36666",
  transition: `fill ${SETTINGS.timeouts.nodeOn/1000}s`
}

const off = {
  fill: "#CFD2D3",
  transition: `fill ${SETTINGS.timeouts.nodeOff/1000}s`
}

class NodeComponent extends Component {

  constructor () {
    super()
    this.connections = null
    this._available = false
  }

  get available() {
    return this._available
  }

  set available(bool) {
    return this._available = bool
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
      if (!this.available) return
      this.available = false
      this.props.activate(id)
    }
    else if (wasOn && nowOn) {
      setTimeout(() => {
        this.props.deactivate(id)
      }, SETTINGS.timeouts.nodeOn)
    }
    else if (wasOn && nowOff) {
      setTimeout(() => {
        this.available = true
        this.props.propagateToConnections(connections)
      }, SETTINGS.timeouts.nodeOff)
    }
  }

  render() {
    const node = this.props.node
    const id = node.id

    const bubbleX = node.pos.x + speechBubbleOffset.x
    const bubbleY = node.pos.y + speechBubbleOffset.y

    let style = null

    switch (node.state) {
      case NODE_OFF:
        style = off
        break;
      case NODE_ON:
        style = on
        break;
      case NODE_ALERT_ON:
        style = alertOn
        break;
      default:
        style = off
        break;
    }

    return (
    	<g>
    		<SpeechBubbleComponent x={bubbleX} y={bubbleY} width="100" height="50" text={node.captionText} visible={node.showCaption}/>
	    	<g>
		      <circle style={style} cx={node.pos.x} cy={node.pos.y} r="30" />
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
