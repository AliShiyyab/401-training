import React, { Component } from 'react';
import CharCard from './CharCard';
import {Row} from 'react-bootstrap';

export class ShowCharacters extends Component {
  render() {
    const CharsCards = this.props.characters.map((data , index) => {
      return(
        <CharCard data={data} key={index} />
      )
    })
    return (
      <Row>
        {CharsCards}
      </Row>
    )
  }
}

export default ShowCharacters;