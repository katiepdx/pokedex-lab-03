import React, { Component } from 'react'
import PokemonItem from './PokemonItem.js';

export default class PokemonList extends Component {
    render() {
        //deconstruct state
        const {
            pokemonStats,
            handlePrevClick,
            handleNextClick,
            currentPage,
            totalPages
        } = this.props;

        return (
            <div>
                {
                // add buttons if pokemonStats has multiple pages
                pokemonStats.length > 0 && 
                <div>
                    {/* onClick use handlePrev/NextClick methods */}
                    <button onClick={handlePrevClick}>Prev</button>
                    <button onClick={handleNextClick}>Next</button>
                    {/* Display current page */}
                    <div>Current Page: {currentPage} of {totalPages}</div>
                </div>
                }
                {
                    // display searched for pokemon items with img
                    pokemonStats.map(pokemon => <PokemonItem pokemon={pokemon} key={pokemon.id} />)
                }
            </div>
        )
    }
}
