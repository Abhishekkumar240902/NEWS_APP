
import './App.css';

import React, {Component } from 'react'

import Navbar from './components/Navbar';
import News from './components/News';
import PropTypes from 'prop-types'
// import {
//   HashRouter as Router,
//   Routes,
//   Route,
//   Link
// } from "react-router-dom";

export default class App extends Component {
 
  render() {
    return (
      <div>

        <Navbar/>
       
        <News pageSize={16} country="in" category="sports"/>
        
       </div>
    )
  }
}
