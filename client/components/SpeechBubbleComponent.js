import React, {Component} from 'react'
import R from 'ramda'

import { RESTING, MESSAGING } from './../constants/constants'

class SpeechBubbleComponent extends Component {
  render() {
    let style = {
      fontSize: 16,
      color: 'rgba(256, 256, 256, 0)',
      background: 'rgba(0, 0, 0, 0)',
      fontFamily: 'circular',
      borderRadius: '5px', 
      padding: '7px',
      transition: 'background 1.0s, color 1.0s'
    }

  	if (this.props.visible) {
      style.color = 'rgba(256, 256, 256, 1)',
      style.background = 'rgba(0, 0, 0, 0.5)'
    }

  	let transform = "translate(" + this.props.x + "," + this.props.y + ")"

    return (
    	<g transform={transform}>
        <switch/>
        <foreignObject width="200" height="50" requiredExtensions="http://www.w3.org/1999/xhtml">
          <div style={style}>{this.props.text}</div>
        </foreignObject>
      </g>
    )
  }
}

module.exports = SpeechBubbleComponent



