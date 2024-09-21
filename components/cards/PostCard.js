import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deletePost } from '../../api/postData';

function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  const isOwner = user?.id === postObj.userId;

  return (
    <Card
      style={{
        width: '100%',
        margin: '10px 0',
        boxShadow: '10px 10px 20px rgba(213, 32, 168, 0.8)', // Shadow to the right and bottom
        backgroundColor: '#00adef', // Light gray background color
        position: 'relative',
      }}
      className="d-flex flex-row"
    >
      <div className="picture-container">
        <Card.Img className="picture" variant="left" src={postObj.imageUrl} alt={postObj.title} />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{postObj.title}</Card.Title>
          <Card.Text>
            {postObj.postTags?.map((tag) => (
              <span key={tag.tag.id}>{tag.tag.name} </span>
            ))}
          </Card.Text>
        </div>
        <div className="d-flex justify-content-end mt-auto">
          <Link href={`/post/${postObj.id}`} passHref>
            <Button variant="primary" className="m-2 btn-lg">VIEW</Button>
          </Link>
          {isOwner && ( // Conditionally render the EDIT button if the user is the owner
            <Link href={`/post/edit/${postObj.id}`} passHref>
              <Button variant="info" className="m-2 btn-lg">EDIT</Button>
            </Link>
          )}
          {isOwner && ( // Conditionally render the DELETE button if the user is the owner
            <Button variant="danger" onClick={deleteThisPost} className="m-2 btn-lg">
              DELETE
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    userId: PropTypes.number, // Make sure the userId is part of postObj
    postTags: PropTypes.arrayOf(PropTypes.shape({
      tag: PropTypes.shape({
        id: PropTypes.number,
      }),
    })),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default PostCard;
