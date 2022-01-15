
const notificationReducer = (state = null, action) => {
    switch(action.type)
    {
        // action.notification would be something like this { type: "NEW_NOTIFICATION", notification: notification }
        case "NEW_NOTIFICATION":
            return action.notification;

        case "DELETE_NOTIFICATION": 
            return null

        default:
            return state;
    }
}

export const showNotification = (notification) => {
    return async dispatch => {
        dispatch({
            type: "NEW_NOTIFICATION",
            notification
        })

        setTimeout(()=>{
            dispatch({
                type: "DELETE_NOTIFICATION",
            })
        }, 5000)
    }
}

export default notificationReducer