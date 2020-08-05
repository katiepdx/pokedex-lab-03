import React from 'react';

export default class HeaderBar extends React.Component {
    render() {
        return (
            <header className="headerBar">
                <h1>Pokedex</h1>
                <nav><a href="./App.js">Home</a></nav>
            </header>
        )
    }
}
