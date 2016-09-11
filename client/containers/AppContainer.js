import React, {Component} from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import MouseInputComponent from './../components/MouseInputComponent'
import TitleScene from './../containers/TitleScene'
import WhatisNomadScene from './../containers/WhatisNomadScene'
import ImagineScene from './../containers/ImagineScene'
import Imagine2Scene from './../containers/Imagine2Scene'
import Imagine3Scene from './../containers/Imagine3Scene'
import VoiceScene from './../containers/VoiceScene'
import Voice2Scene from './../containers/Voice2Scene'
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
	constructor() {
		super()
		this.currentScene = 0
		this.scenes = [
			<TitleScene />,
			<WhatisNomadScene />,
			<ImagineScene />,
			<Imagine2Scene />,
			<Imagine3Scene />,
			<VoiceScene />,
			<Voice2Scene />,
			<InteractiveMapScene />
		]
	}

	nextScene() {
		this.currentScene = (this.currentScene + 1) % R.length(this.scenes)
		this.forceUpdate()
	}

	previousScene() {
		this.currentScene = (this.currentScene - 1) % R.length(this.scenes)
		this.forceUpdate()
	}

  render() {
  	let self = this
    return (
    	<div>
	    	<MouseInputComponent mouseClicked={(event) => { self.nextScene() }} />
	      { this.scenes[this.currentScene] }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
