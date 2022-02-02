import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const authReducer = (state=null, action) => {
    switch(action.type){
        case "LOGIN":
            return action.user;
        case "LOGOUT":
            return action.user;
        case "FETCH_USER":
            return action.user;
        default: 
            return state;
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try{
            const user = await loginService.login({username: username, password: password});
            window.localStorage.setItem('loggedUser', JSON.stringify(user));
    
            dispatch({
                type: "LOGIN",
                user: user,
            })
        }catch(error){
            dispatch(setNotification('username or password is incorrect'));
        }
    }
}

export const logout = () => {

    window.localStorage.removeItem('loggedUser');
    return async dispatch => {
        dispatch({
            type: "LOGOUT",
            user: null
        })
    }
}

export const fetchUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    return async dispatch => {
        if(loggedUserJSON)
        {
          const user = JSON.parse(loggedUserJSON); // parse DOMstrings to JSON
          blogService.setToken(user.token);
    
          return dispatch({
              type: "FETCH_USER",
              user
          })
        }
    }
}

export default authReducer;

