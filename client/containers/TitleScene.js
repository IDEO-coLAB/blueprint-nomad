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
		   left: 150,
		   top: 0
  	}


    return (
      <BackgroundIMageComponent style={style} src="/assets/images/scenes/title.png" />
    )
  }
}

export default Scene
