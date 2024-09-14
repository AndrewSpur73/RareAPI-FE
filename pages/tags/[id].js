import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleTag } from '../../api/tagData';
import TagForm from '../../components/forms/TagForm';

export default function EditTagPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tag, setTag] = useState({});

  useEffect(() => {
    getSingleTag(id).then(setTag);
  }, [id]);

  return (
    <TagForm tagObj={tag} />
  );
}
