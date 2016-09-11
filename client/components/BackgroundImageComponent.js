import React, {Component} from 'react'
import R from 'ramda'

class backgroundImageComponent extends Component {
  render() {
    let style = {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: -1,
    }

    return (
    	<div style={style} >
        <img width="1620" height="1080" src={this.props.src}/>
      </div>
    )
  }
}

module.exports = backgroundImageComponent
