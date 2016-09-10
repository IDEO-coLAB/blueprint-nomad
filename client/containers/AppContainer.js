import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import NodeComponent from './../components/NodeComponent'
import IntroComponent from './../components/IntroComponent'
import SfMapComponent from './../components/SfMapComponent'
import SceneCaptionComponent from './../components/SceneCaptionComponent'
import OverlayComponent from './../components/OverlayComponent'
import NodeConnectionComponent from './../components/NodeConnectionComponent'
import SpeechBubbleComponent from './../components/SpeechBubbleComponent'
import LiveSensorsContainer from './LiveSensorsContainer'
import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'
import { listenFirebase } from './../reducers/firebase'
import { sceneCommands } from './../scenes/sceneCommands'
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

class App extends Component {
  componentDidMount() {
    this.props.startScenes()
  }

  render() {
    let activeSceneId = this.props.scenes.activeScene
    let activeSceneObj = this.props.scenes.scenes[activeSceneId]
    let allObjects = this.props.scenes.scenes[activeSceneId].objects
    let renderConnection = _renderConnection(allObjects)

    let renderedNodes = [].concat(
      R.map(renderConnection, R.filter(isConnection,  allObjects)),
      R.map(renderNode,       R.filter(isNode,        allObjects))
    )

    return (
      <div>
        <SfMapComponent />
        <SceneCaptionComponent visible={activeSceneObj.showSceneCaption} text={activeSceneObj.sceneCaption} />
        <svg width="1620" height="1080" >
          { renderedNodes }
        </svg>
      </div>
    )
  }
}

// helpers
let connectionInput = connectionObj => {

  const obj = R.find((obj) => {
    return obj.state.id === connectionObj.id
  })(sceneObjects)
  return obj._input.state.id
}
let connectionOutput = connectionObj => {
  const obj = R.find((obj) => {
    return obj.state.id === connectionObj.id
  })(sceneObjects)
  return obj._output[1].state.id
}

// curried
let _getObjectWithId = R.curry((objects, id) => { return R.find(R.propEq('id', id), objects) })
let isNode = R.propEq('type', SCENE_NODE)
let isConnection = R.propEq('type', SCENE_CONNECTION)

// rendering helpers
let renderNode = node => {
  return <NodeComponent
    icon={node.icon}
    inputs={node.inputCount()}
    pos={node.pos}
    state={node.state}
    status={node.status}
    id={node.id}
    captionText={node.caption}
    caption={node.showCaption}
    key={node.id} />
}

// curried with objects first
let _renderConnection = R.curry((objects, connection) => {
  let getFromId = _getObjectWithId(objects)
  let cin = getFromId(connectionInput(connection))
  let cout = getFromId(connectionOutput(connection))
  return <NodeConnectionComponent x1={cin.pos.x} y1={cin.pos.y} x2={cout.pos.x} y2={cout.pos.y} status={connection.status} state={connection.state} key={connection.id} />
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
