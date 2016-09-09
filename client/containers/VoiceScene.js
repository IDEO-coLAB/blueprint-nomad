import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import NodeComponent from './../components/NodeComponent'
import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'
import BackgroundIMageComponent from './../components/BackgroundIMageComponent'

class Scene extends Component {
  render() {
    return (
      <BackgroundIMageComponent src="/assets/images/scenes/voice.png" />
    )
  }
}

export default Scene
