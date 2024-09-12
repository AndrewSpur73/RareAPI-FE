import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import UserCard from '../components/cards/UserCard';
import getUserDetails from '../api/userData';

const UserDetailsPage = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.warn(user);
        const authenticatedUserId = user.uid;
        getUserDetails(authenticatedUserId)
          .then((data) => {
            setUserDetails(data);
          })
          .catch((error) => {
            console.error('Error fetching user details:', error);
          });
      } else {
        console.log('No user is signed in.');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="user-details-container">
      {userDetails && (
        <>
          <UserCard userDetails={userDetails} />
        </>
      )}
    </div>
  );
};

export default UserDetailsPage;
