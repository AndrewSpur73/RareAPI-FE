import { useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { getAllPosts, getPostsByTag, getPostsByUser } from '../api/postData';
import PostCard from '../components/cards/PostCard';
import { getAllTags } from '../api/tagData';
import { getAllUsers } from '../api/userData';

export default function ShowAllPosts() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);

  const showPosts = () => {
    getAllPosts()?.then(setPosts);
  };

  const retrieveTags = () => {
    getAllTags().then(setTags);
  };

  const retrieveUsers = () => {
    getAllUsers().then(setUsers);
  };

  useEffect(() => {
    showPosts();
    retrieveTags();
    retrieveUsers();
  }, []);

  const handleFilter = (e) => {
    getPostsByTag(e.target.id).then((data) => setPosts(data));
  };
  const handleUserFilter = (e) => {
    getPostsByUser(e.target.id).then((data) => setPosts(data));
  };

  return (
    <div id="post-page-div" style={{ marginTop: '50px' }}>
      {/* Flex container to push the All Users button to the right */}
      <div className="d-flex justify-content-between">
        {/* Left side: All Tags dropdown */}
        <div>
          <Dropdown>
            <Button className="show-post-btn" onClick={showPosts}>All Tags</Button>
            <Dropdown.Toggle id="dropdown-split-basic" className="show-post-btn" />
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
        </div>

        {/* Right side: All Users dropdown */}
        <div>
          <Dropdown>
            <Button className="show-post-btn" onClick={showPosts}>All Users</Button>
            <Dropdown.Toggle id="dropdown-split-basic" className="show-post-btn" />
            <Dropdown.Menu>
              {users.map((user) => (
                <Dropdown.Item
                  key={user.id}
                  id={user.id}
                  onClick={handleUserFilter}
                >
                  {user.userName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Posts content */}
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={showPosts} />
        ))}
      </div>
    </div>
  );
}
