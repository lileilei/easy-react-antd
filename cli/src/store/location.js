import Immutable from 'immutable'
// ------------------------------------
// Constants
// ------------------------------------
import {LOCATION_CHANGE} from 'react-router-redux'
// ------------------------------------
// Actions
// ------------------------------------
export function locationChange(location = '/') {
  return {
    type: LOCATION_CHANGE,
    payload: location
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({dispatch}) => {
  return (nextLocation) => {
    dispatch(locationChange(nextLocation))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  locationBeforeTransitions: null
})
export default function locationReducer(state = initialState, action) {
  if (action.type === LOCATION_CHANGE) {
    return state.set("locationBeforeTransitions", action.payload)
  }
  return state
}
