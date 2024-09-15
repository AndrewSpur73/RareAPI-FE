import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import { getAllTags } from '../../api/tagData';

const initialState = {
  title: '',
  content: '',
  category: '',
  imageUrl: '',
  tagIds: [], // Initialize as an empty array
};

export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllTags().then(setTags);
    if (obj.id) {
      const tagIds = obj.postTags ? obj.postTags.map((tag) => tag.tag?.id) : [];
      setFormInput({ ...obj, tagIds });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const {
      name, type, checked, value,
    } = e.target;
    if (type === 'checkbox') {
      const currentTagIds = [...formInput.tagIds];
      const tagId = parseInt(value, 10);
      if (checked) {
        currentTagIds.push(tagId);
      } else {
        const index = currentTagIds.indexOf(tagId);
        currentTagIds.splice(index, 1);
      }
      setFormInput((prevState) => ({
        ...prevState,
        tagIds: currentTagIds,
      }));
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formInput, uid: user.uid };

    if (obj.id) {
      // Ensure we're sending the correct form input, including tagIds
      updatePost(payload).then(() => router.push('/feed'));
    } else {
      // Handle post creation
      createPost(payload).then(() => {
        router.push('/feed');
      });
    }
  };

  return (
    <div className="flex w-[500px] mx-auto inter-normal">
      <div className="flex-grow mt-32">
        <Form onSubmit={handleSubmit}>
          <Form.Label>{obj.id ? 'Update' : 'Create'} Post</Form.Label>

          {/* TITLE INPUT */}
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter a title"
              name="title"
              value={formInput.title}
              onChange={handleChange}
              className="input rounded-none"
              required
            />
          </Form.Group>

          {/* CONTENT TEXTAREA */}
          <Form.Group controlId="formContent" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Content"
              style={{ height: '100px' }}
              name="content"
              value={formInput.content}
              onChange={handleChange}
              className="input rounded-none"
              required
            />
          </Form.Group>

          {/* IMAGE URL */}
          <Form.Group controlId="formBasicImage" className="mb-3">
            <Form.Control
              type="text"
              name="imageUrl"
              placeholder="Enter an image URL"
              value={formInput.imageUrl || ''}
              onChange={handleChange}
              className="input rounded-none"
            />
          </Form.Group>

          {/* TAG CHECKBOXES */}
          <div>
            <b>Tags: </b>
            {tags.map((tag) => (
              <label key={tag.id}>
                <input
                  type="checkbox"
                  value={tag.id}
                  onChange={handleChange}
                  checked={formInput.tagIds.includes(tag.id)} // Safeguard against undefined tagIds
                />
                {tag.name}
              </label>
            ))}
          </div>

          {/* SUBMIT BUTTON */}
          <Button type="submit" className="form-button">
            {obj.id ? 'Update' : 'Create'} Post
          </Button>
        </Form>
      </div>
    </div>
  );
}
PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    tagIds: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string,
    content: PropTypes.string,
    imageUrl: PropTypes.string,
    tag: PropTypes.string,
    postTags: PropTypes.arrayOf(PropTypes.shape({ // Define postTags as an array of objects
      tag: PropTypes.shape({
        id: PropTypes.number.isRequired, // Ensure the tag has an id
      }),
    })),
  }),
};
PostForm.defaultProps = {
  obj: initialState,
};
