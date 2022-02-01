import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
    switch(action.type){
        case "FETCH_BLOG": 
            if(action.notes === undefined){
                return null;
            }
            return action.notes;
        
        case "CREATE":
            return state;

        default:
            return null;
    }
}

export const initializeNotes = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();

        dispatch({
            type: "FETCH_BLOG",
            notes: blogs.data,
        })
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const blogs = await blogService.createBlog(content);

        dispatch({
            type: "CREATE",
            data: blogs.data
        })
    }
}

export default blogReducer;