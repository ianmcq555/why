import React, { Component } from 'react'

export default class Brewery extends Component {
    render() {
        const a = this.props.brewery
        console.log(a.website_url)
        return (
            <div>
                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h3 className="card-title">{a.name}</h3>
                        <h5 className="card-title">Brewery Type: {a.brewery_type}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Location: {a.city} - {a.state}</h6>
                        <p className="card-text">{a.description}</p>
                        {a.website_url?
                        <a href={a.website_url} target='_blank' className="btn btn-primary" >View Full Brewery Info Here</a>
                        :<a className="btn btn-primary disabled" >Website Unavailable</a>
                        }
                    </div>
                </div>
            </div>
        )
    }
}