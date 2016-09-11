import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import NodesRenderComponent from './../components/NodesRenderComponent'
import SfMapComponent from './../components/SfMapComponent'

import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'
import { listenFirebase } from './../reducers/firebase'
import { sceneObjects, setupObjects } from './../scenes/sceneObjects'
import { connectionInputId, connectionOutputId } from './../scenes/sceneHelpers'


function mapStateToProps(state, ownProps) {
  return {
    sceneState: state.scenes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    helpers: {
      // these are curried, configure with sceneObjects
      connectionInputId: connectionInputId(sceneObjects),
      connectionOutputId: connectionOutputId(sceneObjects)
    }
  }
}

class InteractiveMapScene extends Component {
  componentDidMount() {
    this.startScene()
  }

  startScene() {
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

  render() {
    return (
      <div>
        <SfMapComponent />
        <NodesRenderComponent sceneObjects={sceneObjects} sceneState={this.props.sceneState} helpers={this.props.helpers} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveMapScene)
