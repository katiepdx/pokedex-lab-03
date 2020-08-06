import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class PokemonItem extends Component {
    render() {
        console.log(this.props.pokemon)
        return (
            // Link to the searched pokemon
            <Link to={`/PokemonDetails/${this.props.pokemon.pokemon}`}>
                {/* Image of the searched pokemon */}
                <img src={this.props.pokemon.url_image} alt={this.props.pokemon.pokemon}/>
            </Link>
        )
    }
}
