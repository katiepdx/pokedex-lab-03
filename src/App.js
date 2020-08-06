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
    //get the data from the API using link - finds userSearch
    const pokemonData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.userSearch}`)

    //update state 
    this.setState({
      //set the pokemonStats to pokemonData in state 
      pokemonStats: pokemonData.body.results,
      //update isLoading to false now that data is here
      isLoading: false
    })

    console.log(this.state.pokemonStats)
  }

  render() {
    return (
      <div className="App">
        <HeaderBar/>
        <div className="userSearchInput">
          <div className="searchBar">
            {/* When user types into searchBar, update the search in state to the value of input */}
            <input onChange={(e) => this.setState({ userSearch: e.target.value })} type="text"></input>

            {/* When button is clicked, use handleClick function to get the Pokemon */}
            <button onClick={this.handleClick}>Get Pokemon</button>
          </div>
          <div className="displayPokemon">
            {
              //if in state page loading is true
              this.state.isLoading
                //displaying LOADING
                ? <h1>LOADING</h1>
                //else display the pokemon the user searched for
                : this.state.pokemonStats.map(onePokemon => <img src={onePokemon.url_image} alt={onePokemon.pokemon} key={onePokemon.pokemon}/>)
            }
          </div>
        </div>
      </div>
    )
  }
}