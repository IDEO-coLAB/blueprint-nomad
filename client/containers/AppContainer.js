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
			{ obj: TitleScene, key: 'TitleScene' },
			{ obj: WhatisNomadScene, key: 'WhatisNomadScene' },
			{ obj: ImagineScene, key: 'ImagineScene' },
			{ obj: Imagine2Scene, key: 'Imagine2Scene' },
			{ obj: Imagine3Scene, key: 'Imagine3Scene' },
			{ obj: VoiceScene, key: 'VoiceScene' },
			{ obj: Voice2Scene, key: 'Voice2Scene' },
			{ obj: InteractiveMapScene, key: 'InteractiveMapScene' },
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
  	// reverse renderScenes returned list because browser renders last in list on top
    return (
    	<div>
	    	<MouseInputComponent 
	    		leftMouseClicked={() => { self.nextScene() }}
	    		rightMouseClicked={() => { self.previousScene() }} />
	    	{ R.reverse(renderScenes(this.currentScene, this.scenes)) }
      </div>
    )
  }
}

let renderScenes = (current, scenes) => {
	let map = R.addIndex(R.map)
	return map((scene, i)  => {
		let hideStyle = {
			opacity: 0,
			transition: 'opacity 1.0s'
		}

		let showStyle = {
			opacity: 1,
			transition: 'opacity 1.0s'
		}

		let style = hideStyle
		if (i === current) { style = showStyle }

		return (
			<div style={style} key={scene.key}>
				{ React.createElement(scene.obj, {active: i === current }) }
			</div>
		)
	}, scenes)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
