import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
  Link,
} from 'react-router-dom';

import HeaderBar from './HeaderBar.js';
import SearchBar from './SearchBar.js';
import PokemonDetails from './PokemonDetails.js';

export default class App extends React.Component {
  
  render() {
    return (
      <div>
        {/* Nav bar links */}
        <Router>
          <nav>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/PokemonDetails/">Pokemon Details</Link></li>
          </nav>
          <Switch>
              <Route 
                  //page with search bar/homepage
                  path="/" 
                  exact
                  render={(routerProps) => <SearchBar {...routerProps} />} 
              />
              <Route 
                  //page with userPokemon PokemonDetails
                  path="/PokemonDetails/:userPokemon" 
                  exact
                  render={(routerProps) => <PokemonDetails {...routerProps} />} 
              />
          </Switch>
        </Router>
        
        <HeaderBar/>
      </div>
    )
  }
}