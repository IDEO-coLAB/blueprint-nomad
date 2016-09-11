import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import NodeComponent from './../components/NodeComponent'
import SceneCaptionComponent from './../components/SceneCaptionComponent'
import NodeConnectionComponent from './../components/NodeConnectionComponent'

import { SCENE_NODE, SCENE_CONNECTION, RESTING, MESSAGING } from './../constants/constants'

class NodesRenderComponent extends Component {
  render() {
    let allObjects = this.props.sceneDataObjects
    let renderConnection = _renderConnection(allObjects, this.props.helpers)

    let renderedNodes = [].concat(
      R.map(renderConnection, R.filter(isConnection,  allObjects)),
      R.map(renderNode,       R.filter(isNode,        allObjects))
    )

    return (
      <div>
        <svg width="1620" height="1080" >
          { renderedNodes }
        </svg>
      </div>
    )
  }


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
let _renderConnection = R.curry((objects, helpers, connection) => {
  let getFromId = _getObjectWithId(objects)
  let cin = getFromId(helpers.connectionInputId(connection.id))
  let cout = getFromId(helpers.connectionOutputId(connection.id))
  return <NodeConnectionComponent x1={cin.pos.x} y1={cin.pos.y} x2={cout.pos.x} y2={cout.pos.y} status={connection.status} state={connection.state} key={connection.id} />
})

export default NodesRenderComponent
