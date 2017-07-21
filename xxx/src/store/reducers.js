import {combineReducers} from 'redux-immutable'
import locationReducer from './location'
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    routing: locationReducer,
    ...asyncReducers
  })
}
export const injectReducer = (store, keyValues) => {
  if (Array.isArray(keyValues)) {
    keyValues.map((item, i)=> {
      store.asyncReducers[item.key] = item.reducer
    })
  } else {
    var {key, reducer} = keyValues
    store.asyncReducers[key] = reducer
  }
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
