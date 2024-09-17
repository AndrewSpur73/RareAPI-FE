import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteTag, getAllTags } from '../api/tagData';
import TagCard from '../components/cards/TagCard';
import { useAuth } from '../utils/context/authContext';

export default function Tags() {
  const { user } = useAuth();
  const router = useRouter();
  const [tags, setTags] = useState([]);

  const getTags = async () => {
    if (user?.id) {
      try {
        const data = await getAllTags();
        setTags(data || []);
      } catch (error) {
        setTags([]);
      }
    }
  };

  useEffect(() => {
    getTags();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const terminateTag = (tag) => {
    if (window.confirm(`Delete ${tag.Name} tag?`)) {
      deleteTag(tag.id).then(() => getTags());
    }
  };
  return (
    <>
      <Button style={{ margin: '5px 0px 5px 0px' }} onClick={() => router.push('/tags/new')}>
        Add Tag
      </Button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {tags.map((tag) => (
          <TagCard
            key={tag.id}
            tagObj={tag}
            handleDelete={terminateTag}
          />
        ))}
      </div>
    </>
  );
}
