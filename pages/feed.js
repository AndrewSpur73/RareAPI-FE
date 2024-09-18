import { useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { getAllPosts, getPostsByTag } from '../api/postData';
import PostCard from '../components/cards/PostCard';
import { getAllTags } from '../api/tagData';

export default function ShowAllPosts() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

  const showPosts = () => {
    getAllPosts()?.then(setPosts);
  };

  const retrieveTags = () => {
    getAllTags().then(setTags);
  };

  useEffect(() => {
    showPosts();
    retrieveTags();
  }, []);

  const handleFilter = (e) => {
    getPostsByTag(e.target.id).then((data) => setPosts(data));
  };

  return (
    <div id="post-page-div">
      <h1 className="h1"> Posts </h1><br />
      <div>
        <Dropdown>
          <Button variant="success" onClick={showPosts}>Show Posts</Button>

          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

          <Dropdown.Menu>
            {tags.map((tag) => (
              <Dropdown.Item
                key={tag.id}
                id={tag.id}
                onClick={handleFilter}
              >
                {tag.name}
              </Dropdown.Item>

            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {posts.map((post) => (
            <PostCard key={post.id} postObj={post} onUpdate={showPosts} />
          ))}
        </div>
      </div>
    </div>
  );
}
