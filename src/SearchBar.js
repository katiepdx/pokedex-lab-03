import React from 'react'

export default class SearchBar extends React.Component {
    render() {
        return (
            <section>
                Search: <input onChange={this.props.handleChange} type="text"></input>
            </section>
        )
    }
}
