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
  tagId: [],
};

export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    getAllTags().then(setTags);
    if (obj.id) setFormInput({ ...obj, tagIds: obj.postTags.map((tag) => tag.tag.id) });
  }, [obj, user]);

  const handleChange = (e) => {
    const {
      name, type, checked, value,
    } = e.target;
    if (type === 'checkbox') {
      const currentTagIds = [...formInput.tagIds];
      const tagId = parseInt(e.target.value, 10); // Assuming value attribute holds tag id
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
      // Handle other input types (text, url, etc.)
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      console.warn(formInput);
      updatePost(formInput).then(() => router.push('/feed'));
    } else {
      const payload = { ...formInput, tagIds: formInput.tagId, uid: user.uid };
      createPost(payload).then((title) => {
        const patchPayload = { id: title };
        updatePost(patchPayload).then(() => {
          router.push('/feed');
        });
      });
    }
  };
  return (
    <div className="flex w-[500px] mx-auto inter-normal">
      <div className="flex-grow mt-32">
        <Form onSubmit={handleSubmit}>
          <Form.Label>{obj.id ? 'Update' : 'Create'} Post</Form.Label>
          {/* TITLE INPUT  */}
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
          {/* POST CONTENT TEXTAREA  */}
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

          {/* POST IMAGE URL  */}
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
          <div>
            <b>Tags: </b>
            {tags.map((tag) => (
              <label key={tag.id}>
                <input
                  type="checkbox"
                  value={tag.id}
                  onChange={handleChange}
                  checked={formInput.tagIds.includes(tag.id)}
                />
                {tag.name}
              </label>
            ))}
          </div>

          {/* SUBMIT BUTTON  */}
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
