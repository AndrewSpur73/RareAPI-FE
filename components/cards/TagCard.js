import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function TagCard({ tagObj, handleDelete }) {
  const router = useRouter();
  return (
    <Card style={{
      width: '18rem',
      boxShadow: '10px 10px 20px rgba(213, 32, 168, 0.8)', // Shadow to the right and bottom
      backgroundColor: '#00adef',
    }}
    >
      <Card.Body>
        <Card.Title>{tagObj.name}</Card.Title>
        <Button
          style={{
            margin: '5px 3px 5px 3px',
          }}
          onClick={() => router.push(`/tags/${tagObj.id}`)}
        > Edit
        </Button>
        <Button style={{ margin: '5px 3px 5px 3px' }} onClick={() => handleDelete(tagObj)}>Delete </Button>
      </Card.Body>
    </Card>
  );
}

TagCard.propTypes = {
  tagObj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
