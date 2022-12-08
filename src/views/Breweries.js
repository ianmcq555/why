import React, { Component } from 'react'
import Brewery from '../components/Brewery';

export default class Breweries extends Component {
    constructor() {
        super();
        this.state = {
            breweries: []
        }
    }
    componentDidMount = async () => {
        const res = await fetch('https://api.openbrewerydb.org/breweries/random?size=10')
        const data = await res.json()
        this.setState({ breweries: data })
    }
    brewSearch = async (e) => {
        e.preventDefault();
        const input = e.target.breweries.value

        const res = await fetch(`https://api.openbrewerydb.org/breweries/search?query=${input}&per_page=5`)
        const data = await res.json()
        console.log(data, 'hi')
        this.setState({ breweries: data })

    }
    render() {
        return (
            <>
                <form onSubmit={(e) => { this.brewSearch(e) }}>
                    <input name='breweries' placeholder='Search for breweries...' />
                    <button type='submit' >Search</button>
                </form>
                <div className='row'>
                    {this.state.breweries.map((a, i) => <Brewery brewery={a} key={i} />)}
                </div>
            </>
        )
    }
}