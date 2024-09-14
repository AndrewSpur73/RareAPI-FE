import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export default function TagCard({ tagObj, handleDelete }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{tagObj.name}</Card.Title>
        <Button style={{ margin: '5px 3px 5px 3px' }}> Edit </Button>
        <Button style={{ margin: '5px 3px 5px 3px' }} onClick={() => handleDelete(tagObj)}>Delete </Button>
      </Card.Body>
    </Card>
  );
}

TagCard.propTypes = {
  tagObj: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
