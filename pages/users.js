import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import UserCard from '../components/cards/UserCard';
import { getUserDetails } from '../api/userData';
import { getAllPosts } from '../api/postData';
import PostCard from '../components/cards/PostCard';
import { useAuth } from '../utils/context/authContext';

const UserDetailsPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const showPosts = () => {
    getAllPosts()?.then(setPosts);
  };

  useEffect(() => {
    showPosts();
    const unsubscribe = firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        const authenticatedUserId = fbUser.uid;
        getUserDetails(authenticatedUserId)
          .then((data) => {
            setUserDetails(data);
          })
          .catch((error) => {
            console.error('Error fetching user details:', error);
          });
      } else {
        console.warn('No user is signed in.');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="user-details-container">
        {userDetails && (
        <>
          <UserCard userDetails={userDetails} />
        </>
        )}
      </div>
      <div id="post-page-div">
        <h1 className="h1"> Posts </h1><br />
        <div>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {posts
              .filter((post) => post.userId === user.id)
              .map((post) => (
                <PostCard key={post.id} postObj={post} onUpdate={showPosts} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsPage;
