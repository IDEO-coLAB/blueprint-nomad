import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import NodesRenderComponent from './../components/NodesRenderComponent'
import SfMapComponent from './../components/SfMapComponent'

import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'
import { listenFirebase } from './../reducers/firebase'
import { sceneObjects, setupObjects } from './../scenes/threeNodeScene'
import { connectionInputId, connectionOutputId } from './../scenes/sceneHelpers'


function mapStateToProps(state, ownProps) {
  return {
    sceneState: state.scenes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initScene: () => {
      // give each node and connection the ability to dispatch
      R.forEach((obj) => {
        obj.setDispatch(dispatch)
      }, sceneObjects)
    },

    helpers: {
      // these are curried, configure with sceneObjects
      connectionInputId: connectionInputId(sceneObjects),
      connectionOutputId: connectionOutputId(sceneObjects)
    }
  }
}

class InteractiveMapScene extends Component {
  componentWillMount() {
    this.props.initScene()
  }

  render() {
    let style = {
      position: 'absolute',
      left: 0,
      top: 0
    }

    if (this.props.active) { startScene() } // note: wrapped in R.once so only started once
    return (
      <div style={style}>
        <SfMapComponent />
        <NodesRenderComponent 
          sceneDataObjects={this.props.sceneState.scenes[0].objects} 
          helpers={this.props.helpers} 
        />
      </div>
    )
  }
}

// wrapped in R.once!!!
const startScene = R.once(() => {
    const solar0 = sceneObjects[0]
    const solar1 = sceneObjects[1]

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
  })

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveMapScene)
