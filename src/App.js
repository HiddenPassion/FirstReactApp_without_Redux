import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';


import classes from './App.css';
import MainPage from './containers/MainPage/MainPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className={classes.App}>  
      <MainPage />      
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
