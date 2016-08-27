import React, {Component} from 'react'

import NodeConnectionComponent from './../components/NodeConnectionComponent'

const con = {
  input: NodeA,
  output: NodeB,
  state: "INACTIVE"
}

const NodeA = {
  output: con,
  pos: {  x:100, y:200 }
}

const NodeB = {
  input: con,
  pos: { x:600, y:600 }
}

class App extends Component {
  render() {
    return (
      <svg width="1000" height="1000">
        <g>
          <circle cx={NodeA.pos.x} cy={NodeA.pos.y} r="40" stroke="black" strokeWidth="3" fill="red" />
          <circle cx={NodeB.pos.x} cy={NodeB.pos.y} r="40" stroke="black" strokeWidth="3" fill="red" />

          <NodeConnectionComponent x1={NodeA.pos.x} x2={NodeB.pos.x} y1={NodeA.pos.y} y2={NodeB.pos.y} />

        </g>
      </svg>
    )
  }
}

module.exports = App
