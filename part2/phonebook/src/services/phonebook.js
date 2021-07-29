import axios from 'axios';

const url = 'https://damp-ridge-84274.herokuapp.com/api/persons';



const getAll = () => {
    const request = axios.get(url);
    return request.then(response => response.data);
}

const create = (newItem) => {
    const request = axios.post(url, newItem);
    return request.then(response => response.data);
}

const update = (id, newObj) => {
    const request = axios.put(`${url}/${id}`, newObj).catch(error => {console.log("could not update", error)});
    return request.then(result => result.data);
}

const deleteName = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data);
}

export default {getAll, create, update, deleteName};