import React, {Component} from 'react'
import R from 'ramda'

import { RESTING, MESSAGING } from './../constants/constants'

class NodeComponent extends Component {
  render() {
  	let fill = (R.equals(this.props.state, MESSAGING))? "red" : "white"
    return (
      <circle cx={this.props.x} cy={this.props.y} r="40" stroke="black" strokeWidth="3" fill={fill} />
    )
  }
}

module.exports = NodeComponent
