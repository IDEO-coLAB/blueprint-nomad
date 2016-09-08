
import React, {Component} from 'react'
import R from 'ramda'

import { RESTING, MESSAGING } from './../constants/constants'
import SpeechBubbleComponent from './SpeechBubbleComponent'
import NodeIconComponent from './NodeIconComponent'

let speechBubbleOffset = { x:40, y:-80 }
let nodeIconOffset = { x:-150, y:40 }

let renderNode = (node, x, y) => {
  return node.icon
    ? <NodeIconComponent
        x={x}
        y={y}
        src={node.icon} />
    : null
}

class NodeComponent extends Component {
  render() {

    const compositeStroke = '#3399FF'
    const atomicStroke = '#FFCE08'
    const isComposite = R.equals(this.props.inputs, 2)

    let styleMessaging = {
      fill: "#0C0F1E",
      fillOpacity: "1.0",
      stroke: isComposite ? compositeStroke : atomicStroke,
      strokeWidth: this.props.pos.strokeWidth,
      transition: 'fill 0.5s'
    }

    let styleResting = {
      fill: "#0C0F1E",
      fillOpacity: "1.0",
      stroke: isComposite ? compositeStroke : atomicStroke,
      strokeWidth: this.props.pos.strokeWidth,
      transition: 'fill 1.0s'
    }

    let bubbleX = this.props.pos.x + speechBubbleOffset.x
    let bubbleY = this.props.pos.y + speechBubbleOffset.y

    let iconX = this.props.pos.x + nodeIconOffset.x
    let iconY = this.props.pos.y + nodeIconOffset.y

    let style = (R.equals(this.props.state, MESSAGING))? styleMessaging : styleResting

    return (
      <g>
        { renderNode(this.props, iconX, iconY) }
        <SpeechBubbleComponent x={bubbleX} y={bubbleY} width="100" height="50" text={this.props.captionText} visible={this.props.caption}/>
        <g onClick={() => { console.log(this.props.id)}} >
          <circle
            style={style}
            cx={this.props.pos.x}
            cy={this.props.pos.y}
            r={this.props.pos.rad} />
         </g>
      </g>
    )
  }
}

module.exports = NodeComponent