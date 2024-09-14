import { useEffect, useState } from 'react';
import { getAllPosts } from '../api/postData';
import PostCard from '../components/cards/PostCard';

export default function ShowAllPosts() {
  const [posts, setPosts] = useState([]);
  const showPosts = () => {
    getAllPosts()?.then(setPosts);
  };

  useEffect(() => {
    showPosts();
  }, []);

  return (
    <div id="post-page-div">
      <h1 className="h1"> Posts </h1><br />
      <div>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {posts.map((post) => (
            <PostCard key={post.Id} postObj={post} onUpdate={showPosts} />
          ))}
        </div>
      </div>
    </div>
  );
}
