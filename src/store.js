import { applyMiddleware, createStore } from 'redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import FightReducer from './containers/Fight/FightReducer'
import VoteReducer from './containers/Vote/VoteReducer'

const middleware = applyMiddleware(thunk)

const reducers = combineReducers({
  FightReducer,
  VoteReducer
})

export default createStore(reducers, middleware)
