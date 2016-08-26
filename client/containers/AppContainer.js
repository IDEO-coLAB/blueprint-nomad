import React, {Component} from 'react'

const renderNodes = () => {

}

const con = {
  input: NodeA,
  output: NodeB,
  state: "INACTIVE"
}

const NodeA = {
  output: con,
  pos: { x:100, y:200 }
}

const NodeB = {
  input: con,
  pos: { x:600, y:600 }
}

const keyframe = `@keyframes test {
  from {
    cx: 100;
    cy: 200;
  }

  to {
    cx: 600;
    cy: 600;
  }
}`

const style = {
  animationName: 'test',
  animationDuration: '4s',
  'transition-timing-function': 'ease-in-out'
}


class App extends Component {
  componentDidMount() {
    console.log('mounted')
    document.styleSheets[0].insertRule(keyframe, document.styleSheets[0].rules.length);
  }
  render() {
    return (
      <svg width="1000" height="1000">
        <g>
          <line x1={NodeA.pos.x} y1={NodeA.pos.y} x2={NodeB.pos.x} y2={NodeB.pos.y} stroke="black" stroke-width="2"/>
          <circle cx={NodeA.pos.x} cy={NodeA.pos.y} r="40" stroke="black" strokeWidth="3" fill="red" />
          <circle cx={NodeB.pos.x} cy={NodeB.pos.y} r="40" stroke="black" strokeWidth="3" fill="red" />

          <circle cx={NodeA.pos.x} cy={NodeA.pos.y} r="10" style={style} stroke="black" strokeWidth="3" fill="black" />

        </g>
      </svg>
    )
  }
}

module.exports = App
