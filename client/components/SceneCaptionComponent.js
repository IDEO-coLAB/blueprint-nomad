'use strict'

import React, {Component} from 'react'
import R from 'ramda'

class SceneCaption extends Component {
  render() {
    let style = {
      position: 'absolute',
      height: '50px',
      width: '1920px',
      top: 200,
      margin: 'auto',
      textAlign: 'center',
      fontSize: 20,
      color: 'rgba(10, 10, 10, 1)',
      fontFamily: 'circular',
      opacity: 0,
      transition: 'opacity 1s'
    }

   	if (this.props.visible) {
      style.opacity = 1
    } else {
      style.opacity = 0
    }

    return (
      <div style={style}>{this.props.text}</div>
    )
  }
}

module.exports = SceneCaption
