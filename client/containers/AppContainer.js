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
import { dispatchSceneCommands } from './../reducers/sceneReducer'
import { sceneCommands } from './../scenes/sceneCommands'
import { sceneObjects } from './../scenes/sceneObjects'

function mapStateToProps(state, ownProps) {
  return {
    scenes: state.scenes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startScenes: function() {
      R.forEach((obj) => {
        obj.setDispatch(dispatch)
      }, sceneObjects)

      sceneObjects[0].setSun(600)
      sceneObjects[0].activate()

      sceneObjects[1].setSun(600)
      sceneObjects[1].activate()
      
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
let renderNode = node => { return <NodeComponent pos={node.pos} state={node.state} id={node.id} captionText={node.captionText} caption={node.showCaption} /> }

// curried with objects first
let _renderConnection = R.curry((objects, connection) => {
  let getFromId = _getObjectWithId(objects)
  let cin = getFromId(connectionInput(connection))
  let cout = getFromId(connectionOutput(connection))
  return <NodeConnectionComponent x1={cin.pos.x} y1={cin.pos.y} x2={cout.pos.x} y2={cout.pos.y} state={connection.state} />
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
