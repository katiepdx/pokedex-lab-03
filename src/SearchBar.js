import React from 'react'
import request from 'superagent';
import PokemonList from './PokemonList.js';

export default class SearchBar extends React.Component {
//set state 
    state = {
        userSearch: '',
        isLoading: false, 
        pokemonStats: [],
        searchFilter: 'pokemon',
        currentPage: 1,
        totalPages: 1
    }

    makeRequest = async () => {
        this.setState({ isLoading: true })
        const pokemonData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${this.state.currentPage}&perPage=20&${this.state.searchFilter}=${this.state.userSearch}`)

        this.setState({
            pokemonStats: pokemonData.body.results,
            totalPages: Math.ceil(Number(pokemonData.body.count) / Number(20)),
            isLoading: false
        })
    }
    handleSearchFilter = (e) => {
        this.setState({ searchFilter: e.target.value });
    }

    handlePrevClick = async () => {
        this.setState({ currentPage: Number(this.state.currentPage) - 1})
        await this.makeRequest();
    }

    handleNextClick = async () => {
        this.setState({ currentPage: Number(this.state.currentPage) + 1})
        await this.makeRequest();
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

                        {/* When button is clicked, use makeRequest function to get the Pokemon */}
                        <button onClick={this.makeRequest}>Get Pokemon</button>
                        </div>
                        <div className="displayPokemon">
                        {
                            //if in state page loading is true
                            this.state.isLoading
                            //displaying LOADING
                            ? <h1>LOADING</h1>
                            //else display the pokemon the user searched for with prev/next buttons
                            : <PokemonList handlePrevClick={this.handlePrevClick} handleNextClick={this.handleNextClick} pokemonStats={this.state.pokemonStats} currentPage={this.state.currentPage} totalPages={this.state.totalPages}/>
                        }
                        </div>
                    </div>
                </section>
          </div>
        )
    }
}
