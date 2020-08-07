import React, { Component } from 'react'
import request from 'superagent';

export default class PokemonDetails extends Component {
    //set chosenPokemon state to an empty string
    state = {
        chosenPokemon: ''
    }

    //when page loads, do this
    componentDidMount = async () => {
        const pokemonName = this.props.match.params.userPokemon
        // get data from API
        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${pokemonName}`)

        //set results of chosen pokemon to the const chosenPokemon
        const chosenPokemon = data.body.results[0];

        //set state again
        this.setState({ chosenPokemon: chosenPokemon })
    }
    render() {
        const { chosenPokemon } = this.state;
        return (
            <div>
                {
                //if there is a chosenPokemon     
                chosenPokemon ?
                //display this
                <div className="pokemonDetails">
                    <h1>You chose {this.state.chosenPokemon.pokemon}!</h1>
                    <img src={this.state.chosenPokemon.url_image} alt={this.state.chosenPokemon.pokemon}/>
                    <p> Type: {this.state.chosenPokemon.type_1}</p>
                    <p> Id: {this.state.chosenPokemon.species_id}</p>
                </div>

                //if it is still loading 
                : 
                //display loading message
                <h1> LOADING </h1>
                }
            </div>
        )
    }
}
