import React, {Component} from 'react'
import R from 'ramda'

import { RESTING, MESSAGING } from './../constants/constants'
import { NODE_DEACTIVATE_TIMEOUT } from './../constants/settings'

class NodeIconComponent extends Component {
  render() {

  	let transform = "translate(" + this.props.x + "," + this.props.y + ")"

    let src = `./../assets/images/${this.props.src}.png`

    return (
    	<g transform={transform}>
        <foreignObject width="100" height="120" requiredExtensions="http://www.w3.org/1999/xhtml">
          <img height="100" src={src} />
        </foreignObject>
      </g>
    )
  }
}

module.exports = NodeIconComponent
