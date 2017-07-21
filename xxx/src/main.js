import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import Immutable from 'immutable'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = Immutable.fromJS(window.___INITIAL_STATE__ || {})
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes}/>,
    MOUNT_NODE
  )
}

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') {
    window.devToolsExtension()
    // window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error}/>, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () => {
        require("./routes/index")
        setImmediate(() => {
          ReactDOM.unmountComponentAtNode(MOUNT_NODE)
          render()
        })
      }
    )
  }
}
// ========================================================
// 验证通过则Go!
// ========================================================
if (window.location.pathname == "/mdt/login") {
  render()
} else {
  if (!sessionStorage.getItem("user")) {
    window.location.href = "/mdt/login"
  } else {
    Ewell.user = JSON.parse(sessionStorage.getItem("user"))
    render()
  }
}

