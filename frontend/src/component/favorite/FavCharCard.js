import React, { Component } from 'react'
import { Card, Button, Modal, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export class FavCharCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: this.props.data.name,
            gender: this.props.data.gender,
            img: this.props.data.img
        }
    }
    // Write some function returned the updates of name and Gender and Show state: 
    handleShow = () => this.setState({ show: true });
    handleClose = () => this.setState({ show: false });
    updateNameState = (event) => this.setState({ name: event.target.value });
    updateGenderState = (event) => this.setState({ gender: event.target.value });

    // Write update functions : 
    updateCard = async (event) => {
        event.preventDefault();
        this.handleClose();
        const bodyData = {
            name: this.state.name,
            gender: this.state.gender,
            img: this.state.img
        }
        const API_URL = `http://localhost:3033/favorite/${this.props.data.id}`;
        const result = await axios.put(API_URL, bodyData);
        console.log(result);
    }

    render() {
        // psiPowers
        const psiPower = this.props.data.psiPowers.map((data, index) => {
            return <ListGroup.Item style={{ display: 'inline', width: '7rem' }} key={index} >{data.name}</ListGroup.Item>;
        })
        return (
            <div>
            {/* Card : To show which card you are added in the favorite page ! */}
                <card>
                    <Card.Body>
                        <Card.Title>
                            {this.state.name}
                        </Card.Title>
                        <Card.Text>
                            {this.state.gender}
                        </Card.Text>
                        <img src={this.state.img} alt='' style={{ height: '5rem' }}></img>
                    </Card.Body>
                    <Card.Footer  >
                        <ListGroup  >
                            {psiPower}
                        </ListGroup>
                    </Card.Footer>
                    <Card.Footer>
                        <Button onClick={() => this.props.deleteCharacters(this.props.data.id)} >
                            Delete !
                        </Button>
                        <Button variant="primary" onClick={this.handleShow} style={{ marginLeft: '7rem' }} >
                            Updated !
                        </Button>
                    </Card.Footer>
                </card>
                {/* Models : to entered new data : */}
                <Modal show={this.state.show} >
                    <Modal.Header >
                        <Modal.Title>Update Name and Gender for Card ... </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.updateCard} >
                            <Form.Control type='text' placeholder='name' name='name' onChange={this.updateNameState} value={this.state.name} />
                            <Form.Control as="select" name='gender' onChange={this.updateGenderState} value={this.state.gender} >
                                <option>male</option>
                                <option>female</option>
                            </Form.Control>
                            <Button variant="primary" type='submit' style={{ marginTop: '2rem' }} >
                                --Save--
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default FavCharCard
