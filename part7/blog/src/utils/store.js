import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import blogReducer from '../reducer/blogReducer';
import userReducer from '../reducer/authReducer';
import authReducer from '../reducer/authReducer';
import notificationReducer from '../reducer/notificationReducer';

const reducer = combineReducers({
    blogs: blogReducer,
    user: authReducer,
    users: userReducer,
    notification: notificationReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store;