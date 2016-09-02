import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import { notifyParticle } from './../reducers/firebase'
import { RESTING, MESSAGING } from './../constants/constants'
import SpeechBubbleComponent from './SpeechBubbleComponent'

let speechBubbleOffset = { x: 50, y: -50 }

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    notifyParticle: function(msg) {
      dispatch(notifyParticle(msg))
    }
  }
}

class NodeComponent extends Component {
  render() {
    let styleMessaging = {
      fill: "#53BCCF",
      transition: 'fill 0.5s'
    }

    let styleResting = {
      fill: "#CFD2D3",
      transition: 'fill 1.0s'
    }

  	let bubbleX = this.props.x + speechBubbleOffset.x
  	let bubbleY = this.props.y + speechBubbleOffset.y

  	let style = (R.equals(this.props.state, MESSAGING))? styleMessaging : styleResting

    let handler = () => {
      this.props.notifyParticle(true)
    }

    return (
    	<g>
    		<SpeechBubbleComponent x={bubbleX} y={bubbleY} width="100" height="50" text={this.props.captionText} visible={this.props.caption}/>
	    	<g onClick={handler} >
		      <circle style={style} cx={this.props.x} cy={this.props.y} r="40" />
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(NodeComponent)
