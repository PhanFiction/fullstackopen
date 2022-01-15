import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' 
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notifcationReducer'

// returns both states
const reducer = combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer
}) 

// calls the store from reducer
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    ),
)

export default store;