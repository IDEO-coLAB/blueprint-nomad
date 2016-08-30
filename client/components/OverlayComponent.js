'use strict'

import React, {Component} from 'react'
import R from 'ramda'

class OverlayComponent extends Component {
  render() {
    let style = {
    	height:'1080px',
    	width:'1920px',
    	position:'absolute',
    	background:'rgba(0,0,0,.7)',
    	transition: 'background 1.0s'
   	}

   	if (this.props.visible) {
   		style.background = 'rgba(0,0,0,.7)'
   	} else {
   		style.background = 'rgba(0,0,0,0)'
   	}

    return (
    	<div style={style}></div>
    )
  }
}

module.exports = OverlayComponent
