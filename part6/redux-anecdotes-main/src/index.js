import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import App from './App'
//import anecdoteReducer from './reducers/anecdoteReducer'
import store from './utils/store'

//const store = createStore(anecdoteReducer)

// The <Provider> component makes the Redux store available to any nested components that need to access the Redux store.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
