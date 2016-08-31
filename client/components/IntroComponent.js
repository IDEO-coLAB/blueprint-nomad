'use strict'

import React, {Component} from 'react'
import R from 'ramda'

class IntroOne extends Component {
  render() {
    return (
      <div>
        <h1>INTRO 2</h1>
      </div>
    )
  }
}

class IntroTwo extends Component {
  render() {
    return (
      <div>
        <h1>INTRO 2</h1>
      </div>
    )
  }
}

class IntroThree extends Component {
  render() {
    return (
      <div>
        <h1>INTRO 3</h1>
      </div>
    )
  }
}

class IntroComponent extends Component {
  render() {
    let style = {
      position: 'absolute',
      height: '1080px',
      width: '1920px',
      color: '#FFF',
      zIndex: '2',
      opacity: 1,
      transition: 'opacity 1s'
   	}

    const intros = [ <IntroOne /> , <IntroTwo />, <IntroThree /> ]

   	if (this.props.visible) {
      style.opacity = 1
    } else {
      style.opacity = 0
    }

    return (
      <div style={style}>
        {intros[this.props.activeScene]}
      </div>
    )
  }
}

module.exports = IntroComponent
