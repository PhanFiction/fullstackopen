
const notificationReducer = (state=null, action) => {
    switch(action.type){
        case "SET_NOTIFICATION":
            return action.data;
        case "CLEAR_NOTIFICATION":
            return null;
        default:
            return state;
    }
}

// set notificaton message
export const setNotification = (message) => {
    
    return async dispatch => {

        dispatch({
            type: "SET_NOTIFICATION",
            data: message,
        })

        setTimeout(()=> {
            dispatch({
                type: "CLEAR_NOTIFICATION",
                data: null,
            })
        }, 5000)
    }
}

export default notificationReducer;