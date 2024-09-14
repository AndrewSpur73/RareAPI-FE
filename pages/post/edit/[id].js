import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostForm from '../../../components/forms/PostForm';

export default function EditPost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  // make a call to the API to get the member data
  useEffect(() => {
    getSinglePost(id).then(setEditItem);
  }, [id]);

  // pass object to form
  return (<PostForm obj={editItem} />);
}
