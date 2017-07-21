// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import home from './Home'
import login from './Login'
import PageNotFound from './PageNotFound'
import watson from './watson'
import Redirect from './PageNotFound/redirect'

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/mdt',
  component: CoreLayout,
  indexRoute: {
    onEnter (nextState, replace) {
      replace('/mdt/login')
    }
  },
  childRoutes: [
    home(store),
    login(store),
    watson(store)
  ]
})
export default createRoutes
