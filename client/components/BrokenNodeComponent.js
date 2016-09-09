import React, {Component} from 'react'
import R from 'ramda'

import { RESTING, MESSAGING, ALERT } from './../constants/constants'
import SpeechBubbleComponent from './SpeechBubbleComponent'
import { NODE_ACTIVATE_TIMEOUT, NODE_DEACTIVATE_TIMEOUT } from './../constants/settings'

let speechBubbleOffset = { x: 50, y: -50 }

class NodeComponent extends Component {
  render() {
    if (this.props.id === 'energyPrediction') {
      console.log(this.props)
    }

    let styleMessaging = {
      fill: "#53BCCF",
      transition: 'fill 1.0s'
    }

    let styleResting = {
      fill: "#CFD2D3",
      transition: 'fill 1.0s'
    }

    let styleAlert = {
      fill: "#ff0000",
      transition: 'fill 1.0s'
    }

  	let bubbleX = this.props.pos.x + speechBubbleOffset.x
  	let bubbleY = this.props.pos.y + speechBubbleOffset.y

    let style = styleResting
  	if (R.equals(this.props.state, MESSAGING)) { style = styleMessaging }
    // if (R.equals(this.props.status, ALERT)) { style = styleAlert }

    return (
    	<g>
    		<SpeechBubbleComponent x={bubbleX} y={bubbleY} width="100" height="50" text={this.props.captionText} visible={this.props.caption}/>
	    	<g onClick={() => {console.log(123) }} >
          <circle 
            style={style} 
            cx={this.props.pos.x} 
            cy={this.props.pos.y} 
            r="20">
          </circle>
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

module.exports = NodeComponent
