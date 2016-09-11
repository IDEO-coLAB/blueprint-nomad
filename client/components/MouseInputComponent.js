import React, {Component} from 'react'
import R from 'ramda'

class MouseInputComponent extends Component {
  render() {
    let style = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 1620,
      height: 1080,
      zIndex: 1,
      opacity: 0
    }

    let self = this

    return (
    	<div 
        style={style} 
        onClick={event => self.props.leftMouseClicked()}
        onContextMenu={event => {
          event.preventDefault() 
          self.props.rightMouseClicked()
        }}>
      </div>
    )
  }
}

module.exports = MouseInputComponent
