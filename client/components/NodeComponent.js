
import React, {Component} from 'react'
import R from 'ramda'
import perlin from 'perlin-noise'

import { RESTING, MESSAGING } from './../constants/constants'
import SpeechBubbleComponent from './SpeechBubbleComponent'
import NodeIconComponent from './NodeIconComponent'

let speechBubbleOffset = { x:40, y:-80 }
let nodeIconOffset = { x:-150, y:40 }

let speechOffsetNoise = perlin.generatePerlinNoise(
  1e6, 1, { octaveCount: 10, amplitude: 0.1, persistence: 0.1 })

let getSpeechBubblePos = (i) => {
  let xindx = i % R.length(speechOffsetNoise)
  let xnoise = speechOffsetNoise[xindx]

  let yindx = (i + 10000) % R.length(speechOffsetNoise)
  let ynoise = speechOffsetNoise[yindx]

  let offset = {
    x: xnoise * 50,
    y: ynoise * 50
  }

  return offset
}

let renderSpeechBubble = (node, x, y) => {
  return <SpeechBubbleComponent x={x} y={y} width="100" height="50" text={node.captionText} visible={node.caption} />
}

let renderIcon = (node, x, y) => {
  return node.icon
    ? <NodeIconComponent
        x={x}
        y={y}
        src={node.icon} />
    : null
}

let renderNode = (node, style) => {
  return  (
    <g onClick={() => { console.log(node.id)}} >
      <circle
        style={style}
        cx={node.pos.x}
        cy={node.pos.y}
        r={node.pos.rad} />
     </g>
   )
}

class NodeComponent extends Component {
  constructor() {
    super()

    // start with random so components don't dance in sync
    this.floatTimer = Math.floor(Math.random() * 500)
    let self = this
    setInterval(() => {
      self.floatTimer++
      self.forceUpdate()
    }, 20)
  }

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

    let noiseOffset = getSpeechBubblePos(this.floatTimer)
    let bubbleX = this.props.pos.x + speechBubbleOffset.x + noiseOffset.x
    let bubbleY = this.props.pos.y + speechBubbleOffset.y + noiseOffset.y

    let iconX = this.props.pos.x + nodeIconOffset.x
    let iconY = this.props.pos.y + nodeIconOffset.y

    let style = (R.equals(this.props.state, MESSAGING))? styleMessaging : styleResting

    return (
      <g>
        { renderIcon(this.props, iconX, iconY) }
        { renderSpeechBubble(this.props, bubbleX, bubbleY) }
        { renderNode(this.props, style) }
      </g>
    )
  }
}

module.exports = NodeComponent