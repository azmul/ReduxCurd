import { FETCH_TODOS, DELETE_TODO, CREATE_TODO ,FETCH_TODO,UPDATE_TODO} from './types';
import axios from 'axios';

// Fetch all todos
export const fetchtodos = () =>
      async dispatch=>{
          const res = await axios.get('/todos');
          dispatch({type: FETCH_TODOS, payload: res.data})
      }
// Delete todo
export const deletetodo = (id)=>
      async dispatch=>{
          await axios.delete(`/todos/${id}`);
          dispatch({type: DELETE_TODO, payload:id})
      }   
// Create todo
export const createTodo = (data) =>
     async dispatch=>{
         const {userId,title,completed} = data;
         const res = await axios.post('/todos',{userId,title,completed});
         dispatch({type: CREATE_TODO, payload:res.data})
     }
// Fetch todo
export const fetchtodo = (id)=>
     async dispatch=>{
         const res = await axios.get(`/todos/${id}`);
         dispatch({type: FETCH_TODO, payload: res.data})
     }
// Update todo
export const updatetodo = (data)=>
     async dispatch=>{
        console.log(data); 
        const {id,userId,title,completed} = data;
        const res = await axios.put(`/todos/${id}`,{userId,title,completed});
        dispatch({type: UPDATE_TODO, payload:res.data })
     }

