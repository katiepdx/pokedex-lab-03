import React from 'react';
import './App.css';
import HeaderBar from './HeaderBar';
import SearchBar from './SearchBar';
import request from 'superagent';

export default class App extends React.Component {
//set state 
  state = {
    userSearch: '',
    isLoading: false, //set to false and update when data is loading
    pokemonStats: []
  }

  handleClick = async () => {
    //get API data 
    //now loading, so change state to true
    this.setState({ isLoading: true })
    //get the data from the API using link 
    const pokemonData = await request.get('https://alchemy-pokedex.herokuapp.com/api/pokedex')

    //update state 
    this.setState({
      //set the pokemonStats to pokemonData in state 
      pokemonStats: pokemonData.body.results,
      //update isLoading to false now that data is here
      isLoading: false
    })

    console.log(pokemonData)
  }
    
  render() {
    return (
      <div className="App">
        <HeaderBar/>
        <div className="searchBar">
          {/* When user types into searchBar, update the search in state to the value of input */}
          <SearchBar onChange={(e) => this.setState({ search: e.target.value})}/>

          {/* When button is clicked, use handleClick function to get the Pokemon */}
          <button onClick={this.handleClick}>Get Pokemon</button>
        </div>
      </div>
    )
  }
}