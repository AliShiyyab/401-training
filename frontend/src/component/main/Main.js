import axios from 'axios';
import React, { Component } from 'react';
import ShowCharacters from './ShowCharacters';

export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: []
        }
    }

    componentDidMount = async () => {
        console.log('hi')
        const url = 'http://localhost:3033/get-characters';
        const request = await axios.get(url);
        this.setState({ characters: request.data });
        console.log(request.data);
    }
    render() {
        return (
            <div>
                <ShowCharacters characters={this.state.characters} />
            </div>
        )
    }
}

export default Main;