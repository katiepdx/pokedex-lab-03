import React from 'react'
import request from 'superagent';
import PokemonList from './PokemonList.js';

export default class SearchBar extends React.Component {
//set state 
    state = {
        searchFilter: 'pokemon',
        userSearch: '',
        currentPage: 1,
        totalPages: 1,
        isLoading: false, 
        pokemonStats: []
    }
    
    // check search params
    componentDidMount = async () => {
        // get search params and set to a const params
        const params = new URLSearchParams(this.props.location.search);

        // get params and set them to their own const
        const currentPage = params.get('page')
        const searchFilter = params.get('filter')
        const userSearch = params.get('userSearch')

        // if the three params exist, set them to state
        if(searchFilter && currentPage && userSearch) {
            // set state 
            this.setState ({
                currentPage: currentPage,
                searchFilter: searchFilter,
                userSearch: userSearch
            })
        }
        // fetch data using the params
        await this.makeRequest();
        console.log('=============================\n')
        console.log('|| currentPage, searchFilter, userSearch', currentPage, searchFilter, userSearch)
        console.log('\n=============================')
    }

    makeRequest = async () => {
        this.setState({ isLoading: true })
        const pokemonData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${this.state.currentPage}&perPage=20&${this.state.searchFilter}=${this.state.userSearch}`)

        await this.setState({
            pokemonStats: pokemonData.body.results,
            totalPages: Math.ceil(Number(pokemonData.body.count) / Number(20)),
            isLoading: false
        })

        const params = new URLSearchParams(this.props.location.search);
        
        // set params to what is in state
        params.set('page', this.state.currentPage)
        params.set('filter',this.state.searchFilter)
        params.set('userSearch', this.state.userSearch)

        this.props.history.push('?' + params.toString());

    }

    // set new search to page 1 on click
    handleGetPokemonClick = async (e) => {
        e.preventDefault();
        // reset currentPage to 1 for new search 
        await this.setState({ currentPage: 1})
        // fetch data
        await this.makeRequest()
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
                        <input onChange={(e) => this.setState({ userSearch: e.target.value })} value={this.state.userSearch} type="text"></input>

                        {/* searchFilter dropdown */}
                        <select onChange={this.handleSearchFilter} value={this.state.searchFilter} >
                            <option value="pokemon">Pokemon Name</option>
                            <option value="type">Type</option>
                            <option value="id">Id</option>
                        </select>

                        {/* When button is clicked, use makeRequest function to get the Pokemon */}
                        <button onClick={this.handleGetPokemonClick}>Get Pokemon</button>
                        </div>
                        <div className="displayPokemon">
                        {
                            //if in state page loading is true
                            this.state.isLoading
                            //displaying LOADING
                            ? <h1>LOADING</h1>
                            //else display the pokemon the user searched for with prev/next buttons
                            : <PokemonList 
                            handlePrevClick={this.handlePrevClick} 
                            handleNextClick={this.handleNextClick} 
                            pokemonStats={this.state.pokemonStats} 
                            currentPage={this.state.currentPage} 
                            totalPages={this.state.totalPages}/>
                        }
                        </div>
                    </div>
                </section>
          </div>
        )
    }
}
