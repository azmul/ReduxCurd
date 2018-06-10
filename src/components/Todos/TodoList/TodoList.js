import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SearchInput, {createFilter} from 'react-search-input';

import './TodoList.css';
import {fetchtodos, deletetodo} from '../../../redux/actions/todoActions';
import Todo from '../Todo/Todo';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            done: false,
            searchTerm:''
        };
    }
    componentWillMount = () =>{
        this.props.fetchtodos().then(
            ()=>{this.setState({done:true})},
            (err)=>{console.log(err)}
        );
    }
    deletePostHandelar = (id)=>{
       this.props.deletetodo(id).then(
           ()=>{this.setState({done:true})},
           (err)=>{console.log(err)}
       )
    }
    searchUpdated = (term)=>{
        this.setState({searchTerm: term})
    }
    render() {
        const {todos} = this.props;
        const {done} = this.state;
        const filterTodos = todos.filter(createFilter(this.state.searchTerm, ['userId','title']));

        const todoItems = filterTodos.length > 0 ? (
            <div className="ui cards">
               {filterTodos.map((todo, index)=><Todo key={index} todo={todo} deletePost={this.deletePostHandelar} />)}
            </div>
        ): (<div className="no-data">No Data Available</div>)

        return (
            <div>
                <SearchInput className="search-input" onChange={this.searchUpdated} />
               {todoItems}
            </div>
        );
    }
}

TodoList.propTypes = {
    fetchtodos: PropTypes.func.isRequired,
    deletetodo: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired
}

const mapStateToProps = ({todos}) =>{
    return{
         todos: todos.items
    }
}

export default connect(mapStateToProps, {fetchtodos,deletetodo})(TodoList);