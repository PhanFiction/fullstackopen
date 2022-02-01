import userServices from '../services/user';

const userReducer = (state=[], action) => {
    switch(action.type){
        case "GET_ALL_USERS":
            return action.data;
        default:
            return state;
    }
}

// fetch all users from the database
export const initializeUsers = () => {
    return async dispatch => {
        const users = await userServices.getAll();
        console.log(users);
        return dispatch({
            type: "GET_ALL_USERS",
            data: users,
        })
    }
}

export default userReducer; 