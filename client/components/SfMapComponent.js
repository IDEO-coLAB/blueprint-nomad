import React, {Component} from 'react'
import R from 'ramda'

class SfMapComponent extends Component {
  render() {
    let style = {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: -1,
      opacity: 1
    }

    return (
    	<div style={style} >
        <img width="1620" height="1080" src="/assets/images/sf-map.jpg"/>
      </div>
    )
  }
}

module.exports = SfMapComponent
