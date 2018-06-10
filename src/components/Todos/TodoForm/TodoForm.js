import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Redirect} from 'react-router-dom';
import {NavLink} from 'react-router-dom';

import {createTodo, fetchtodo,updatetodo} from '../../../redux/actions/todoActions';

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: this.props.todo ? this.props.todo.id : null,
            userId: this.props.todo ? this.props.todo.userId : '',
            title: this.props.todo ? this.props.todo.title : '',
            completed: this.props.todo ? this.props.todo.completed : false,
            done: false,
            loading: false
         };
    }
    componentDidMount = ()=>{ 
        const id = this.props.match.params.id;
        if(id !== 'new'){
            this.setState({loading:true})
            this.props.fetchtodo(id).then(
                ()=>{this.setState({loading:false})},
                (err)=>{console.log(err)}
            )
        }
    }
    todoFormSumbitHandaler = event =>{
        event.preventDefault();
        const {id,userId,title,completed} = this.state;
        if(userId !=='' && title !==''){
            this.setState({loading:true,done:false})
            if(id){
                this.props.updatetodo({id,userId,title,completed}).then(
                    ()=>{this.setState({loading:false,done:true})},
                    (err)=>{console.log(err)}
                )
            }else{
                this.props.createTodo({userId,title,completed}).then(
                    ()=>{this.setState({loading:false,done:true})},
                    (err)=>{console.log(err)}
                )
            } 
        }  
    }

    handleInputChange= event =>  {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;  
        this.setState({
          [name]: value
        });
      }

    render() {
        const {userId,title,completed,loading,done} = this.state;
        //console.log(userId,title,completed);
        const todoForm = (
            <form className={classnames('ui','form',{loading:loading})} onSubmit={this.todoFormSumbitHandaler}>
                   <label>
                    User ID
                    <select name="userId" value={userId} onChange={this.handleInputChange}>
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    </label>
                    <div className="field">
                        <label>Title</label>
                        <input tabIndex="1" name="title" onChange={this.handleInputChange} value={title}  placeholder="Title" />
                    </div>
                    <div className="ui checkbox">
                        <input tabIndex="2" type="checkbox" name="completed" onChange={this.handleInputChange} checked={completed}/>
                        <label>Completed</label>
                    </div>
                    <br />
                    <button tabIndex="3" type="submit" className="ui button">Submit</button>
                    <NavLink to="/todos" exact strict className="ui button">Cancel</NavLink>
                </form>
        )
        return (
            <div>
                {done ? <Redirect to="/todos" exact strict /> : todoForm}
            </div>
        );
    }
}

TodoForm.propTypes ={
    createTodo: PropTypes.func.isRequired,
    fetchtodo: PropTypes.func.isRequired,
    updatetodo: PropTypes.func.isRequired,
    todo: PropTypes.object
}

const mapStateToProps = ({todos}, props) =>{
    if(props.match.params.id !== 'new'){
        return{
            todo: todos.items.find(todo=>todo.id === Number(props.match.params.id))
        }
    }  
    return {todo: null} 
}
export default connect(mapStateToProps,{createTodo,fetchtodo,updatetodo})(TodoForm);