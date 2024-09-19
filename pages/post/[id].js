/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../api/postData';
import CommentCard from '../../components/cards/CommentCard';
import { useAuth } from '../../utils/context/authContext';
import CommentForm from '../../components/forms/CommentForm';
import { deleteComment, editComment } from '../../api/commentData';
// import TagCard from '../../components/TagCard';

export default function ViewPost() {
  const { user } = useAuth();
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getPostDetails = () => {
    getSinglePost(id).then(setPostDetails);
  };

  useEffect(() => {
    getPostDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addComment = (newComment) => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      comments: [...prevDetails.comments, newComment],
    }));
    getPostDetails();
  };

  const handleDelete = (commentId) => {
    if (window.confirm('Delete comment?')) {
      deleteComment(commentId)
        .then(() => {
          getPostDetails();
        });
    }
  };

  const updateComment = (commentId, newContent) => {
    const payload = { id: commentId, content: newContent };
    editComment(payload).then(() => getPostDetails());
  };

  return (
    <div className="mt-5 d-flex flex-column">
      <div className="d-flex">
        {/* Image on the left */}
        <div className="me-3">
          <img src={postDetails?.imageUrl} alt={postDetails?.title} style={{ width: '300px', height: 'auto', borderRadius: '8px' }} />
        </div>
        {/* Title, tags, and content on the right */}
        <div style={{ color: 'black', flex: 1 }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{postDetails?.title}</h1>
          <div style={{ color: 'black', marginBottom: '10px' }}>
            {postDetails.postTags?.map((tag) => (
              <span
                key={tag.tag.id}
                style={{
                  margin: '3px',
                  padding: '2px 5px',
                  border: '1px solid #080a2b',
                  borderRadius: '5px',
                  display: 'inline-block',
                }}
              >
                {tag.tag.name}
              </span>
            ))}
          </div>
          <p>{postDetails?.content || ''}</p>
        </div>
      </div>
      <hr />
      {/* Comments section */}
      <div>
        <CommentForm postId={id} onCommentAdded={addComment} />
        {postDetails.comments?.map((c) => (
          <CommentCard
            key={c.id}
            commentObj={c}
            user={user}
            consumeComment={handleDelete}
            updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );
}
