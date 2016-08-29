import React, {Component} from 'react'

import { generateTranslationAnimation, insertAnimations } from './../utils/utils'
import { CONNECTION_ANIMATION_TIME } from './../constants/settings'


class NodeConnection extends Component {
  constructor() {
    super()
    this.keyframe = null
  }

  componentWillMount() {
    this.keyframe = generateTranslationAnimation(
      this.props.x1,
      this.props.y1,
      this.props.x2,
      this.props.y2,
      CONNECTION_ANIMATION_TIME)
    insertAnimations(this.keyframe.keyframeRule)
  }

  render() {
    return (
      <g>
        <line x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} stroke="black" strokeWidth="3"/>
        <g style={this.keyframe.keyframeStyle}>
          <circle cx="0" cy="0" r="10" fill="black" />
        </g>
      </g>
    )
  }
}

module.exports = NodeConnection
