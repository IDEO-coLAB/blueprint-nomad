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
import InteractiveThreeNodeMapScene from './../containers/InteractiveThreeNodeMapScene'
import InteractiveFullMapScene from './../containers/InteractiveFullMapScene'
import LatestScene from './../containers/LatestScene'


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
			// { obj: VoiceScene, key: 'VoiceScene' },
			// { obj: Voice2Scene, key: 'Voice2Scene' },
			{ obj: InteractiveThreeNodeMapScene, key: 'InteractiveThreeNodeMapScene' },
			{ obj: InteractiveFullMapScene, key: 'InteractiveFullMapScene' },
			{ obj: LatestScene, key: 'LatestScene' }
		]
	}

	nextScene() {
		this.currentScene = (this.currentScene + 1) % R.length(this.scenes)
		this.forceUpdate()
	}

	previousScene() {
		let len = R.length(this.scenes)
		this.currentScene = (this.currentScene + len - 1) % len
		this.forceUpdate()
	}

  render() {
  	let style = {
		   position: 'absolute',
		   height: '1200px',
		   width: '2133px',
		   left: 0,
		   top: 0,
		   backgroundColor: '#000000'
  	}

  	let self = this
  	// reverse renderScenes returned list because browser renders last in list on top
    return (
    	<div style={style}>
	    	<MouseInputComponent 
	    		leftMouseClicked={() => { self.nextScene() }}
	    		rightMouseClicked={() => { self.previousScene() }} />
	    	{ R.reverse(renderScenes(this.currentScene, this.scenes)) }
      </div>
    )
  }
}

let renderScenes = (current, scenes) => {
	let style = {
		position: 'absolute',
		width: '1620px',
		height: '1080px',
		left: '256px',
		top: '60px'
	}

	let hideStyle = {
		opacity: 0,
		transition: 'opacity 1.0s'
	}

	let showStyle = {
		opacity: 1
		// transition: 'opacity 1.0s'
	}

	let map = R.addIndex(R.map)
	return map((scene, i)  => {
		let mergedStyle
		if (i === current) { 
			mergedStyle = R.merge(style, showStyle) 
		} else {
			mergedStyle = R.merge(style, hideStyle)
		}

		return (
			<div style={mergedStyle} key={scene.key}>
				{ React.createElement(scene.obj, {active: i === current }) }
			</div>
		)
	}, scenes)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
