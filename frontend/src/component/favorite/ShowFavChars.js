import React, { Component } from 'react'
import FavCharCard from './FavCharCard';
import { Row } from 'react-bootstrap';

export class ShowFavChars extends Component {
    render() {
        // used this function to returned all Data in favCharacters using map.
        // When map is undefined : Data is empty because mongo is not worked.
        const returnedData = this.props.favCharacters.map((data, index) => {
            return <FavCharCard data={data} key={index} deleteCharacters={this.props.deleteCharacters} />;
        })
        return (
            <div>
                <Row>
                    {returnedData}
                </Row>
            </div>
        )
    }
}

export default ShowFavChars
