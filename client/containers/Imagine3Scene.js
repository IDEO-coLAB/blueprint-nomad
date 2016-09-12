import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import NodeComponent from './../components/NodeComponent'
import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'
import BackgroundIMageComponent from './../components/BackgroundIMageComponent'
import SfMapComponent from './../components/SfMapComponent'

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
	    	<SfMapComponent />
	      <BackgroundIMageComponent src="/assets/images/scenes/imagine-3.png" />
	     </div>
    )
  }
}

export default Scene
