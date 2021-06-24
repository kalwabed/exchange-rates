import { createStore, combineReducers } from 'redux'
import { ratesReducer } from './rates'
import { userReducer } from './user'

const store = createStore(
  combineReducers({
    user: userReducer,
    rates: ratesReducer
  })
)

export default store
