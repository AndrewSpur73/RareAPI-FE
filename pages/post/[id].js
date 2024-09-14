/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../api/postData';
// import TagCard from '../../components/TagCard';
export default function ViewArt() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setPostDetails);
  }, [id]);

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
    </div>
  );
}
