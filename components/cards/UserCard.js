import React from 'react';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
// import Link from 'next/link';

function UserDetailCard({ userDetails }) {
  return (
    <Card className="user-details-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title className="d-flex flex-column align-items-center justify-content-center" id="user-detail-card-title">Profile</Card.Title>
        <Card.Img
          variant="top"
          src={userDetails.imageUrl || ''}
          alt={userDetails.userName || ''}
          style={{ height: '400px', borderBottom: '5px solid black' }}
        />
        <Card.Text><strong>User Name:</strong> {userDetails.userName}</Card.Text>
        <Card.Text><strong>Email:</strong> {userDetails.email}</Card.Text>
        <Card.Text><strong>Bio:</strong> {userDetails.bio}</Card.Text>
        <div className="d-flex flex-column align-items-center justify-content-center">
          {/* <Link href={`/user/${userDetails.id}`} passHref>
            <Button className="user-card-button" variant="danger">EDIT</Button>
          </Link> */}
        </div>
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
