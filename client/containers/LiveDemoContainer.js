import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import { listenFirebase } from './../reducers/firebase'

function mapStateToProps(state, ownProps) {
  return {
    scenes: state.scenes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startScenes: function() {
      dispatch(listenFirebase())
    }
  }
}

class App extends Component {
  componentWillMount() {
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
        <IntroComponent visible={this.props.scenes.showIntro} activeScene={activeSceneId} />
        <OverlayComponent visible={this.props.scenes.showOverlay} />
        <SceneCaptionComponent visible={activeSceneObj.showSceneCaption} text={activeSceneObj.sceneCaption} />
        <svg width="1920" height="1080" style={{background: '#efefef'}}>
          { renderedNodes }
        </svg>
      </div>
    )
  }
}

// helpers
let connectionInput = connection => { return R.head(connection.inputs) }
let connectionOutput = connection => { return R.head(connection.outputs) }

// curried
let _getObjectWithId = R.curry((objects, id) => { return R.find(R.propEq('id', id), objects) })
let isNode = R.propEq('type', SCENE_NODE)
let isConnection = R.propEq('type', SCENE_CONNECTION)

// rendering helpers
let renderNode = node => { return <NodeComponent x={node.pos.x} y={node.pos.y} state={node.state} id={node.id} captionText={node.captionText} caption={node.showCaption} /> }

// curried with objects first
let _renderConnection = R.curry((objects, connection) => {
  let getFromId = _getObjectWithId(objects)
  let cin = getFromId(connectionInput(connection))
  let cout = getFromId(connectionOutput(connection))
  return <NodeConnectionComponent x1={cin.pos.x} y1={cin.pos.y} x2={cout.pos.x} y2={cout.pos.y} state={connection.state} />
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
