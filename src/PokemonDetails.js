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

        //check if data is correct 
        console.log(data)
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
                    <p> Shape: {this.state.chosenPokemon.shape}</p>
                    <p> Speed: {this.state.chosenPokemon.speed}</p>
                    <p> Ability 1: {this.state.chosenPokemon.ability_1}</p>
                </div>

                //if it is still loading 
                : 
                //display loading message
                <h1> LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING </h1>
                }

            </div>
        )
    }
}
