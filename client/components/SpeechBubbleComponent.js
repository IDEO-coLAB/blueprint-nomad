import React, {Component} from 'react'
import R from 'ramda'

import { RESTING, MESSAGING } from './../constants/constants'
import { NODE_DEACTIVATE_TIMEOUT } from './../constants/settings'

class SpeechBubbleComponent extends Component {

  render() {
    const transitionTime = NODE_DEACTIVATE_TIMEOUT / 1000

    let transform = `translate(${this.props.x} ${this.props.y})`

    let style = {
      fontSize: 17,
      color: 'rgb(255, 255, 255)',
      background: 'rgb(6, 96, 126)',
      opacity: 0,
      fontFamily: 'circular',
      borderRadius: '5px',
      padding: '14px 17px',
      // transition: 'opacity 3s ease-in-out'
    }

    if (this.props.visible) {
      style.opacity = 1
    }

    return (
      <g transform={transform}>
        <foreignObject width="200" height="50" requiredExtensions="http://www.w3.org/1999/xhtml">
          <div style={style}>
            {this.props.text}
          </div>
        </foreignObject>
      </g>
    )
  }
}

module.exports = SpeechBubbleComponent
