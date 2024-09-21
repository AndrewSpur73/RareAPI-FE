import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function UserDetailCard({ userDetails }) {
  return (
    <Card
      className="user-details-card"
      style={{
        width: '22rem',
        margin: '20px',
        marginTop: '100px',
        boxShadow: '0px 0px 30px rgba(213, 32, 168, 0.8)',
        backgroundColor: '#00adef',
        fontSize: 'larger',
      }}
    >
      <Card.Body>
        <Card.Title className="d-flex flex-column align-items-center justify-content-center" style={{ fontSize: '40px' }} id="user-detail-card-title">Profile</Card.Title>
        <Card.Img
          variant="top"
          src={userDetails.imageUrl || ''}
          alt={userDetails.userName || ''}
          style={{ height: '400px', border: '4px solid #080a2b' }}
        />
        <Card.Text><strong>User Name:</strong> {userDetails.userName}</Card.Text>
        <Card.Text><strong>Email:</strong> {userDetails.email}</Card.Text>
        <Card.Text><strong>Bio:</strong> {userDetails.bio}</Card.Text>
      </Card.Body>
    </Card>
  );
}

UserDetailCard.propTypes = {
  userDetails: PropTypes.shape({
    userName: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    imageUrl: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default UserDetailCard;
