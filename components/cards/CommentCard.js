import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'react-bootstrap';

export default function CommentCard({
  commentObj, user, consumeComment, updateComment,
}) {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(commentObj.content);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
    setEditText(commentObj.content);
  };

  const handleSave = () => {
    updateComment(commentObj.id, editText);
    setEdit(false);
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Card.Text>{commentObj.user?.userName}</Card.Text>
            <Image
              src={commentObj.user?.imageUrl || 'default-image-url.jpg'}
              alt={`${commentObj.user?.userName}'s profile`}
              style={{
                margin: '5px',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '10px',
              }}
            />
          </div>          {edit ? (
            <div>
              <textarea
                value={editText}
                onChange={handleChange}
                rows="3"
                style={{ width: '100%' }}
              />
              <div className="mt-2">
                <Button variant="secondary" onClick={handleCancel} className="ms-2">Cancel</Button>
              </div>
            </div>
          ) : (
            <Card.Title style={{ margin: '5px 0px 5px 0px' }}>{commentObj.content}</Card.Title>
          )}
          { user.id === commentObj.userId ? (
            <>
              { edit ? (<Button onClick={handleSave}>save</Button>) : (<Button onClick={handleEdit}>📝</Button>)}
              <Button variant="danger" onClick={() => consumeComment(commentObj.id)}>☠️</Button>
            </>
          ) : ''}
        </Card.Body>
      </Card>
    </div>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    content: PropTypes.string,
    userId: PropTypes.number,
    id: PropTypes.number,
    user: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  consumeComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
};
