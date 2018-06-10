import { FETCH_TODOS, DELETE_TODO , CREATE_TODO, FETCH_TODO} from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default function(state= initialState, action){
    switch(action.type){
        case FETCH_TODOS:
             return{
                 ...state,
                 items: action.payload
             }
        case DELETE_TODO:
             const items = [...state.items];
             const todos = items.filter(item=> item.id !== action.payload);
             return{
                 ...state,
                 items: todos
             } 
        case CREATE_TODO:
             return{
                 ...state,
                 item: action.payload
             }
        case FETCH_TODO:
             return{
                 ...state,
                 item: action.payload
             }     
        default:
          return state;
    }
}