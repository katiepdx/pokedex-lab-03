import React from 'react';
import './App.css';
import HeaderBar from './HeaderBar';
import SearchBar from './SearchBar';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderBar/>
        <SearchBar/>
      </div>
    )
  }
}