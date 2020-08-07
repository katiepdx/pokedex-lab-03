import React from 'react'
import request from 'superagent';
// import PokemonItem from './PokemonItem.js';
import PokemonList from './PokemonList.js';

export default class SearchBar extends React.Component {
//set state 
    state = {
        userSearch: '',
        isLoading: false, //set to false and update when data is loading
        pokemonStats: [],
        searchFilter: 'pokemon',
        currentPage: 1
    }

    handleClick = async () => {
        //get API data 
        //now loading, so change state to true
        this.setState({ isLoading: true })
        //get the data from the API using link - finds userSearch using the searchFilter category
        const pokemonData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${this.state.currentPage}&perPage=20&${this.state.searchFilter}=${this.state.userSearch}`)

        this.setState({
        //set the pokemonStats to pokemonData in state 
        pokemonStats: pokemonData.body.results,
        //update isLoading to false now that data is here
        isLoading: false
        })
    }
    handleSearchFilter = (e) => {
        this.setState({ searchFilter: e.target.value });
    }

    // handle prev click
    handlePrevClick = () => {
        this.setState({ currentPage: Number(this.state.currentPage) - 1})
        // fetch data
    }

    // handle next click
    handleNextClick = () => {
        this.setState({ currentPage: Number(this.state.currentPage) + 1})
        // fetch data
    }

  
    render() {
        return (
            <div className="App">
                <section className="body">
                    <div className="userSearchInput">
                        <div className="searchBar">
                        {/* When user types into searchBar, update the search in state to the value of input */}
                        <input onChange={(e) => this.setState({ userSearch: e.target.value })} type="text"></input>

                        {/* searchFilter dropdown */}
                        <select onChange={this.handleSearchFilter}>
                            <option value="pokemon">Pokemon Name</option>
                            <option value="type">Type</option>
                            <option value="id">Id</option>
                        </select>

                        {/* When button is clicked, use handleClick function to get the Pokemon */}
                        <button onClick={this.handleClick}>Get Pokemon</button>
                        </div>
                        <div className="displayPokemon">
                        {
                            //if in state page loading is true
                            this.state.isLoading
                            //displaying LOADING
                            ? <h1>LOADING</h1>
                            //else display the pokemon the user searched for with prev/next buttons
                            : <PokemonList handlePrevClick={this.handlePrevClick} handleNextClick={this.handleNextClick} pokemonStats={this.state.pokemonStats} currentPage={this.state.currentPage}/>
                        }
                        </div>
                    </div>
                </section>
          </div>
        )
    }
}
