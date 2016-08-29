import React, {Component} from 'react'
import R from 'ramda'

import { generateTranslationAnimation, insertAnimations } from './../utils/utils'
import { SETTINGS } from './../constants/settings'
import { RESTING, MESSAGING } from './../constants/constants'


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
      SETTINGS.timeouts.connectionMessaging)
    insertAnimations(this.keyframe.keyframeRule)
  }

  render() {
    let style = (R.equals(this.props.state, MESSAGING))? this.keyframe.keyframeStyle : {display: 'none'}
    
    return (
      <g>
        <line x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} stroke="black" strokeWidth="3"/>
        <g style={style}>
          <circle cx="0" cy="0" r="10" fill="black" />
        </g>
      </g>
    )
  }
}

module.exports = NodeConnection
