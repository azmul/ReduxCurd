import React, { Component } from 'react';
import LOGO from '../../../assets/images/logo.png';
import {NavLink} from 'react-router-dom';

const Todo = (props) =>{
    return(
        <div className="ui card">
            <div className="content">
            <img src={LOGO} className="ui mini right floated image" />
            <div className="header">{props.todo.userId}</div>
            <div className="meta">{props.todo.title}</div>
            <div className="description">
               {props.todo.completed.toString()}
            </div>
            </div>
            <div className="extra content">
            <div className="ui two buttons">
                <NavLink className="ui green basic button" to={`/todo/${props.todo.id}`} exact strict >Edit</NavLink>
                <button onClick={()=>props.deletePost(props.todo.id)} className="ui red basic button" role="button">Delete</button>
            </div>
            </div>
        </div>
    )
}

export default Todo;