import React from 'react'
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import AppContainer from './containers/AppContainer'
import { sceneReducer } from './reducers/sceneReducer'
import { demoSceneReducer } from './reducers/demoSceneReducer'

// import css
import './styles/main.scss'

const appReducer = combineReducers({
  scenes: sceneReducer,
  firebaseDemo: demoSceneReducer
})

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
const appStore = createStoreWithMiddleware(appReducer)

ReactDOM.render(
  <Provider store={ appStore }>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
)