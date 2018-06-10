import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../Home/Home';
import TodoList from '../Todos/TodoList/TodoList';
import TodoForm from '../Todos/TodoForm/TodoForm';

const Routes = (
    <div>
        <Route path="/" exact strict component={Home} /> 
        <Route path="/todos" exact strict component={TodoList} />
        <Route path="/todo/new?" exact strict component={TodoForm} />
        <Route path="/todo/:id?" exact strict component={TodoForm} />
    </div>
)

export default Routes;