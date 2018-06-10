import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';

import Aux from './Hoc/Aux';
import Routes from './Routes/Routes';
import AppBar from './AppBar/AppBar';

class App extends Component {
  render() {
    return (
      <Router>
       <Aux>
         <div className="ui container">
           <AppBar />
           {Routes}
         </div>
      </Aux>
   </Router>
    );
  }
}

export default App;
