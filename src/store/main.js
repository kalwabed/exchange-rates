import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { ratesReducer } from './rates'
import { userReducer } from './user'

const store = createStore(
  combineReducers({
    user: userReducer,
    rates: ratesReducer
  }),
  applyMiddleware(thunk)
)

export default store
