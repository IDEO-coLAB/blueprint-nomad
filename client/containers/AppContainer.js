import React, {Component} from 'react'

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

const generateConnectionAnimation = (x1, y1, x2, y2, time) => {
  const animationName = `kf-animation`
  const animationDuration = `${time}s`
  const animationEasing = 'ease-in-out'

  const keyframeRule = `@keyframes ${animationName} {
    from {
      transform: translate(${x1}px, ${y1}px);
    }
    to {
      transform: translate(${x2}px, ${y2}px);
    }
  }`

  const keyframeStyle = {
    animation: animationName,
    animationDuration: animationDuration,
    animationEasing: animationEasing
  }

  return { keyframeRule, keyframeStyle}
}

const generateLinkAnimation = (nodeA, nodeB) => {
  const animationTime = 4
  return generateConnectionAnimation(nodeA.pos.x, nodeA.pos.y, nodeB.pos.x, nodeB.pos.y, animationTime)
}

const insertAnimations = (keyframeRule) => {
  document.styleSheets[0].insertRule(keyframeRule, document.styleSheets[0].rules.length);
}


class App extends Component {
  constructor() {
    super()
    this.kf = {keyframeStyle:null}
    console.log(this.kf)
  }

  componentDidMount() {
    console.log('mounted')
    // this.kf = generateLinkAnimation(NodeA, NodeB)
    // insertAnimations(this.kf.keyframeRule)
    this.render()
  }

  render() {
    const keyFrame = generateLinkAnimation(NodeA, NodeB)
    insertAnimations(keyFrame.keyframeRule)

    console.log('rendered')
    return (
      <svg width="1000" height="1000">
        <g>
          <line x1={NodeA.pos.x} y1={NodeA.pos.y} x2={NodeB.pos.x} y2={NodeB.pos.y} stroke="black" strokeWidth="3"/>
          <circle cx={NodeA.pos.x} cy={NodeA.pos.y} r="40" stroke="black" strokeWidth="3" fill="red" />
          <circle cx={NodeB.pos.x} cy={NodeB.pos.y} r="40" stroke="black" strokeWidth="3" fill="red" />

          {console.log(keyFrame.keyframeStyle)}


          <g style={keyFrame.keyframeStyle}>
            <circle cx={NodeA.pos.x} cy={NodeA.pos.y} r="10" fill="black" />
          </g>

        </g>
      </svg>
    )
  }
}

module.exports = App
