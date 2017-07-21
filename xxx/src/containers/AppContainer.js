import React, {Component, PropTypes} from 'react'
import {browserHistory, Router} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const {routes, store} = this.props
    const history = syncHistoryWithStore(browserHistory, store, {
      selectLocationState (state) {
        return state.get('routing').toObject();
      }
    })
    return (
      <Provider store={store}>
        <Router history={history} children={routes}/>
      </Provider>
    )
  }
}

export default AppContainer
