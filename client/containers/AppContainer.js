import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import InteractiveMapScene from './../containers/InteractiveMapScene'

function mapStateToProps(state, ownProps) {
  return {
    scenes: state.scenes
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

class App extends Component {
  render() {
    return (
      <InteractiveMapScene />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
