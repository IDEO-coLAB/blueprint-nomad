import React, {Component} from 'react'
import R from 'ramda'

import { RESTING, MESSAGING } from './../constants/constants'
import SpeechBubbleComponent from './SpeechBubbleComponent'

let speechBubbleOffset = { x: 50, y: -50 }

class NodeComponent extends Component {
  render() {
  	let bubbleX = this.props.x + speechBubbleOffset.x
  	let bubbleY = this.props.y + speechBubbleOffset.y

  	let fill = (R.equals(this.props.state, MESSAGING))? "#53BCCF" : "white"
    return (
    	<g>
    		{ renderSpeechBubble(this.props.caption, bubbleX, bubbleY) }
	    	<g onClick={() => { console.log(this.props.id)}} >
		      <circle cx={this.props.x} cy={this.props.y} r="40" stroke="#165D6A" strokeWidth="1" fill={fill} />
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
