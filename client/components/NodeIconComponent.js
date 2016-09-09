import React, {Component} from 'react'
import R from 'ramda'

class NodeIconComponent extends Component {
  render() {

  	let transform = "translate(" + this.props.x + "," + this.props.y + ")"
    let src = `./../assets/images/${this.props.src}.png`

    return (
    	<g transform={transform}>

        <line
          x1="85"
          y1="15"
          x2="150"
          y2="-40"
          strokeDasharray="9,4"
          stroke="#FFCE08"
          strokeWidth="3" />
        <foreignObject width="100" height="120" requiredExtensions="http://www.w3.org/1999/xhtml">
          <img height="100" src={src} />
        </foreignObject>
      </g>
    )
  }
}

module.exports = NodeIconComponent
