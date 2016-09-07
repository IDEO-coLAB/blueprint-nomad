import React, {Component} from 'react'
import R from 'ramda'

import { RESTING, MESSAGING } from './../constants/constants'
import SpeechBubbleComponent from './SpeechBubbleComponent'

let speechBubbleOffset = { x: 50, y: -50 }

class NodeComponent extends Component {
  render() {
    let styleMessaging = {
      stroke: "#53BCCF",
      transition: 'fill 0.5s'
    }

    let styleResting = {
      stroke: "#CFD2D3",
      transition: 'fill 1.0s'
    }

  	let bubbleX = this.props.pos.x + speechBubbleOffset.x
  	let bubbleY = this.props.pos.y + speechBubbleOffset.y

  	let style = (R.equals(this.props.state, MESSAGING))? styleMessaging : styleResting

    return (
    	<g>
    		<SpeechBubbleComponent x={bubbleX} y={bubbleY} width="100" height="50" text={this.props.captionText} visible={this.props.caption}/>
	    	<g onClick={() => {console.log(123) }} >
          <circle 
            stroke="#53BCCF" 
            fill="#ffffff" 
            strokeWidth={this.props.pos.strokeWidth} 
            cx={this.props.pos.x} 
            cy={this.props.pos.y} 
            r={this.props.pos.rad}>
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
