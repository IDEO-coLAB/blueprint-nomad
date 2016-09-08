import React, {Component} from 'react'
import R from 'ramda'

import { RESTING, MESSAGING } from './../constants/constants'
import { NODE_DEACTIVATE_TIMEOUT } from './../constants/settings'

class SpeechBubbleComponent extends Component {
  render() {

    const transitionTime = NODE_DEACTIVATE_TIMEOUT / 1000

    let style = {
      fontSize: 16,
      color: 'rgba(256, 256, 256, 0)',
      background: 'rgba(0, 0, 0, 0)',
      fontFamily: 'circular',
      borderRadius: '5px',
      padding: '12px 15px',
      transition: `background ${transitionTime}s, color ${transitionTime}s`
    }

  	if (this.props.visible) {
      style.color = 'rgba(12, 15, 30, 1.00)'
      style.background = 'rgba(255, 255, 255, 0.95)'
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
