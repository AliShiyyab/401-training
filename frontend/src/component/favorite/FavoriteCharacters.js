import React, { Component } from 'react'
import axios from 'axios';
import ShowFavChars from './ShowFavChars';

export class FavoriteCharacters extends Component {
    constructor(props){
        super(props);
        this.state = {
            favCharacters: []
        }
    }
    componentDidMount = async () => {
        // API : 
        const API_URL = `http://localhost:3033/favorite`;
        // Requests Results : 
        const result = await axios.get(API_URL);
        // setState
        this.setState({
            favCharacters:result.data,
        })
    }

    // Delete Characters : 
    deleteCharacters = async (id) => {
        // Used ID Params.
        const newCardsData = this.state.favCharacters.filter(data => data.id !== id);
        this.setState({
            favCharacters:newCardsData,
        })
        const API_URL = `http://localhost:3033/favorite/${id}`;
        const result = await axios.delete(API_URL);
        console.log(result);
    }
    render() {
        return (
            <div>
                <ShowFavChars favCharacters={this.state.favCharacters} deleteCharacters={this.deleteCharacters}/>
            </div>
        )
    }
}

export default FavoriteCharacters
