import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { createComment } from '../../api/commentData';
import { useAuth } from '../../utils/context/authContext';

export default function CommentForm({ postId, onCommentAdded }) {
  const [commentText, setCommentText] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { postId, content: commentText, userId: user.id };
    createComment(payload).then((newComment) => {
      onCommentAdded(newComment);
      setCommentText('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">Submit Comment</Button>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  onCommentAdded: PropTypes.func.isRequired,
};
