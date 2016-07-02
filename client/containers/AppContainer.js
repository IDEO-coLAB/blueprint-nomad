import React, {Component} from 'react'

import BannerComponent from '../components/BannerComponent'
import HelloGatesComponent from '../components/HelloGatesComponent'
import VampiresComponent from '../components/VampiresComponent'
import Adder1Container from '../containers/Adder1Container'

class App extends Component {
  render() {
    return (
    	<div>
            <BannerComponent />
    		<div className="essay3">
    			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sag
    			ittis pretium vestibulum. Vestibulum nec blandit mauris. Phasellus 
    			nec imperdiet est. Integer eu posuere sem. Duis suscipit fringilla 
    			lacus, id viverra justo tempor a. Curabitur nec sem convallis neque 
    			mattis cursus. Mauris feugiat nec dolor a eleifend. Donec non urna 
    			pulvinar, ultrices nulla in, eleifend dolor. Fusce et lectus nisl.
    			</p>
    		</div>
            <HelloGatesComponent />
            <div className="essay3">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sag
                ittis pretium vestibulum. Vestibulum nec blandit mauris. Phasellus 
                nec imperdiet est. Integer eu posuere sem. Duis suscipit fringilla 
                lacus, id viverra justo tempor a. Curabitur nec sem convallis neque 
                mattis cursus. Mauris feugiat nec dolor a eleifend. Donec non urna 
                pulvinar, ultrices nulla in, eleifend dolor. Fusce et lectus nisl.
                </p>
            </div>
            <VampiresComponent />
            <div className="essay3">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sag
                ittis pretium vestibulum. Vestibulum nec blandit mauris. Phasellus 
                nec imperdiet est. Integer eu posuere sem. Duis suscipit fringilla 
                lacus, id viverra justo tempor a. Curabitur nec sem convallis neque 
                mattis cursus. Mauris feugiat nec dolor a eleifend. Donec non urna 
                pulvinar, ultrices nulla in, eleifend dolor. Fusce et lectus nisl.
                </p>
            </div>
            <Adder1Container />
    	</div>
    )
  }
}

module.exports = App
