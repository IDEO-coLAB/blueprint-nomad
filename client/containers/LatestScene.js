import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import NodeComponent from './../components/NodeComponent'
import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'
import BackgroundIMageComponent from './../components/BackgroundIMageComponent'

class Scene extends Component {
  render() {

  	let style = {
      position: 'absolute',
      height: '1080px',
      width: '1620px',
    	top: 0,
    	left: 0
   	}

    return (
    	<div style={style} >
	      <BackgroundIMageComponent src="/assets/images/scenes/latest.png" />
	     </div>
    )
  }
}

export default Scene
