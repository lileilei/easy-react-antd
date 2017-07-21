import {injectReducer} from "../../store/reducers";
import Home from './containers/homeContainer'
import Redirect from '../PageNotFound/redirect'
import homePage from '../HomePage'
import data from '../Data'
import meeting from '../Meeting'
import patient from '../Patient'
import message from '../Message'
import meetingDetail from '../MeetingDetail'
import editReport from '../EditConsulationReport'
import auxiliary from '../Auxiliary'
export default (store) => ({
  path: 'home',
  // component:Home,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const page = require('./containers/homeContainer').default
      const reducer = require('./reducers/home_reducers').default
      injectReducer(store, {key: 'home', reducer})
      cb(null, page)
    })
  },
  indexRoute: {
    onEnter (nextState, replace) {
      replace('/mdt/home/homePage')
    }
  },
  childRoutes: [
    homePage(store),
    meeting(store),
    auxiliary(store),
    message(store),
    patient(store),
    data(store),
    meetingDetail(store),
    editReport(store),
    Redirect
  ]
})



