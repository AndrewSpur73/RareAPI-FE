import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteTag, getAllTags } from '../api/tagData';
import TagCard from '../components/cards/TagCard';
import { useAuth } from '../utils/context/authContext';

export default function Tags() {
  const { user } = useAuth();
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
  }, []);

  const terminateTag = (tag) => {
    if (window.confirm(`Delete ${tag.Name} tag?`)) {
      deleteTag(tag.id).then(() => getAllTags());
    }
  };
  return (
    <div>
      <Button style={{ margin: '5px 0px 5px 0px' }}> Add Genre</Button>
      {tags.map((tag) => (
        <TagCard
          key={tag.id}
          tagObj={tag}
          handleDelete={terminateTag}
        />
      ))}
    </div>
  );
}
