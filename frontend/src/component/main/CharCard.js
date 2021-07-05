import React, { Component } from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import axios from 'axios';

export class CharCard extends Component {

    addToFavorite = async (id) => {
        const url = `http://localhost:3033/favorite`;
        const request = await axios.post(url, this.props.data);
        console.log(request.data);
    }

    render() {
        const psiPowers = this.props.data.psiPowers.map((data, index) => {
            return (
                <div>
                    <Card.Img src={data.img} alt='' style={{ width: '3rem' }} />
                    <Card.Text style={{ display: 'inline', width: '7rem' }}>{data.name}</Card.Text>
                </div>
            )
        })
        return (
            <div>
                <Card style={{ width: '25rem', marginLeft: '3rem', marginTop: '5rem' }}>
                    <Card.Img src={this.props.data.img} alt='' style={{ height: '25rem' }} />
                    <Card.Body>
                        <Card.Title>
                            {this.props.data.name}
                        </Card.Title>
                        <Card.Text>
                            Gender: {this.props.data.gender}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Row>

                            {psiPowers}
                        </Row>
                    </Card.Footer>
                    <Card.Footer>
                        <Button onClick={() => this.addToFavorite()} >
                            Add To Favorite
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default CharCard;