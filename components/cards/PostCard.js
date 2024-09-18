import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePost } from '../../api/postData';

function PostCard({ postObj, onUpdate }) {
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };
  return (
    <Card style={{
      width: '18rem', margin: '10px', border: 'solid 5px black', background: 'grey',
    }}
    > {console.warn(postObj)}
      <Card.Img variant="top" src={postObj.imageUrl} alt={postObj.title} style={{ height: '400px' }} />
      {console.warn(postObj)}
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>
        <Card.Text>{postObj.postTags?.map((tag) => (
          <span key={tag.tag.id}>{tag.tag.name} </span>
        ))}
        </Card.Text>
        <Link href={`/post/${postObj.id}`} passHref>
          <Button style={{ background: 'teal' }} variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/post/edit/${postObj.id}`} passHref>
          <Button style={{ background: 'goldenrod' }} variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPost} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}
PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    userId: PropTypes.number,
    postTags: PropTypes.arrayOf(PropTypes.shape({
      tag: PropTypes.shape({
        id: PropTypes.number,
      }),
    })),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default PostCard;
