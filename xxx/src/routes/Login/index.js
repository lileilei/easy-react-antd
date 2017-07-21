import {injectReducer} from "../../store/reducers";

export default (store) => ({
  path: 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const page = require('./LoginContainer').default
      const reducer = require('./reducers').default
      injectReducer(store, {key: 'login', reducer})
      cb(null, page)
    })
  },

  childRoutes: []
})

