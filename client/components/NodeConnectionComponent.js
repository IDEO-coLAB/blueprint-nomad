import React, {Component} from 'react'
import R from 'ramda'

import { generateTranslationAnimation, generateBlinkAnimation, insertAnimations } from './../utils/utils'
import { SETTINGS } from './../constants/settings'
import { RESTING, MESSAGING, ALERT, NORMAL } from './../constants/constants'


class NodeConnection extends Component {
  constructor() {
    super()
    this.keyframe = null
    this.blinkKeyframe = null
  }

  componentWillMount() {
    this.keyframe = generateTranslationAnimation(
      this.props.x1,
      this.props.y1,
      this.props.x2,
      this.props.y2,
      SETTINGS.timeouts.connectionMessaging)
    insertAnimations(this.keyframe.keyframeRule)

    this.blinkKeyframe = generateBlinkAnimation()
    insertAnimations(this.blinkKeyframe.keyframeRule)
  }

  render() {
    let style = (R.equals(this.props.state, MESSAGING))? this.keyframe.keyframeStyle : {display: 'none'}

    let circleFill = "#FFCE08"
    let circleAnimation = (this.props.status === ALERT)? this.blinkKeyframe.keyframeStyle : null

    return (
      <g>
        <line x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} strokeDasharray="9,4" stroke="#FFCE08" strokeWidth="3"/>
        <g style={style}>
          <circle cx="0" cy="0" r="12" fill={circleFill} style={circleAnimation} />
        </g>
      </g>
    )
  }
}

module.exports = NodeConnection
