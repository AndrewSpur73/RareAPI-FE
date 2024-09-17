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
    if (window.confirm('delete comment?')) {
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
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={postDetails?.imageUrl} alt={postDetails?.title} style={{ width: '300px' }} />
      </div>
      <div style={{ color: 'black' }}>
        <h5>
          {postDetails?.title}
        </h5>
        <div style={{ color: 'black', border: 'solid, 2px, black' }} className="d-flex flex-wrap">
          {postDetails.postTags?.map((tag) => (
            <span key={tag.tag.id} style={{ margin: '3px' }}>{tag.tag.name} </span>
          ))}
        </div>
        <p>{postDetails?.content || ''}</p>
        <hr />
      </div>
      <div>
        <CommentForm
          postId={id}
          onCommentAdded={addComment}
        />
        { postDetails.comments?.map((c) => (
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
