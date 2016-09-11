import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import NodesRenderComponent from './../components/NodesRenderComponent'

import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'
import { listenFirebase } from './../reducers/firebase'
import { sceneObjects, setupObjects } from './../scenes/sceneObjects'


function mapStateToProps(state, ownProps) {
  return {
    scenes: state.scenes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startScenes: function() {

      const solar0 = sceneObjects[0]
      const solar1 = sceneObjects[1]

      // give each node and connection the ability to dispatch
      R.forEach((obj) => {
        obj.setDispatch(dispatch)
      }, sceneObjects)

      // set the solar panels to listen to firebase events
      listenFirebase(sceneObjects[0], sceneObjects[1])

      const initSolarPanels = () => {
        solar0.activate()
        solar1.activate()
      }

      const initScene = () => {
        console.log('scene about to init')
        setTimeout(() => {
          initSolarPanels()
        }, 1000)

        setTimeout(() => {
          sceneObjects[6].activate(0, 'NORMAL')
        }, 12000)
      }

      setupObjects(initScene).then(initScene)
    }
  }
}

class InteractiveMapScene extends Component {
  componentDidMount() {
    this.props.startScenes()
  }

  render() {
    return (
      <NodesRenderComponent scenes={this.props.scenes} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveMapScene)
