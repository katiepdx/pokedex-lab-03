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
                    {
                        // adds prev button to all pages but the first
                        Number(currentPage) !== 1 && <button onClick={handlePrevClick}>Prev</button>

                    }
                    {
                        // adds next button for all pages but the totalPages/last page
                        Number(currentPage) !== Number(totalPages) && <button onClick={handleNextClick}>Next</button>

                    }
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
