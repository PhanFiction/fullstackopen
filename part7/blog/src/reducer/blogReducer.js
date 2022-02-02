import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const blogReducer = (state = [], action) => {
    switch(action.type){
        case "FETCH_BLOG": 
            if(action.data === undefined){
                return null;
            }
            return action.data;
        case "LIKE":
            const foundBlog = state.find(blog => blog.id === action.data.id);
            const updatedBlog = {
                ...foundBlog,
                likes: foundBlog.likes
            }
            return state.map(blog => blog.id === action.data.id ? updatedBlog : blog);
        case "CREATE":
            return [...state, action.data];
        case "DELETE":
            return state.filter(blog => blog.id !== action.id);
        default:
            return state;
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch({
            type: "FETCH_BLOG",
            data: blogs,
        })
    }
}

export const createBlog = (content) => {
    return async dispatch => {

        try{
            const blog = await blogService.createBlog(content);
            dispatch({
                type: "CREATE",
                data: blog
            });
        }catch(error){
            dispatch(setNotification('failed to create', content.title));
        }
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        try{
            await blogService.deleteBlog(id);
            dispatch(setNotification("blog deleted successfully"));
            dispatch({
                type: "DELETE",
                id: id
            });
        }catch(error){
            dispatch(setNotification('failed to delete'));
        }
    }
}

export const updateLike = blog => {
    return async dispatch => {
        blog.likes += 1;
        const updatedBlog = await blogService.update(blog.id, blog);
        dispatch({
            type: "LIKE",
            data: updatedBlog,
        });
    }
}

export default blogReducer;