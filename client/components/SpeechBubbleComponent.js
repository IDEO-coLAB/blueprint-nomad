import React, {Component} from 'react'
import R from 'ramda'

import { RESTING, MESSAGING } from './../constants/constants'

class SpeechBubbleComponent extends Component {
  render() {
  	let style = {
  		fontSize: 16,
      color: '#ffffff',
  		background: 'rgba(0, 0, 0, 0.5)',
  		fontFamily: 'circular',
      borderRadius: '5px', 
      padding: '7px'
  	}

  	let transform = "translate(" + this.props.x + "," + this.props.y + ")"

    return (
    	<g transform={transform}>
        <switch/>
        <foreignObject width="200" height="50" requiredExtensions="http://www.w3.org/1999/xhtml">
          <div style={style}>Here is a paragraph that requires word wrap</div>
        </foreignObject>
      </g>
    )
  }
}

module.exports = SpeechBubbleComponent



