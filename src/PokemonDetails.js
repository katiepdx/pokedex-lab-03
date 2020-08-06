import React, { Component } from 'react'
import request from 'superagent';

export default class PokemonDetails extends Component {
    //set state - desiredPokemon: {}
    state = {
        desiredPokemon: {}
    }

    //when page loads, do this
    componentDidMount = async () => {
        const pokemonName = this.props.match.params.userPokemon
        // get data from API
        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${pokemonName}`)
        //check if data is correct 
        console.log(data)
    }
    render() {
        console.log("Hello")
        return (
           <h1>Hello</h1>
        )
    }
}
