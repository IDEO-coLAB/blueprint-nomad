import React, {Component} from 'react'
import R from 'ramda'

class SfMapComponent extends Component {
  render() {
    let style = {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: -1,
      opacity: 0.2
    }

    return (
    	<div style={style} >
        <img src="/assets/images/sf-map.jpg"/>
      </div>
    )
  }
}

module.exports = SfMapComponent
