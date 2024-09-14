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
  tags: [],
};

export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    getAllTags().then(setTags);
    if (obj.id) setFormInput(obj);
  }, [obj, user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleTagChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setFormInput((prevState) => ({
      ...prevState,
      tags: selectedOptions, // Update the state with an array of selected tag IDs
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      // Update Post then View Post
      updatePost(formInput).then(() => router.push('/feed'));
    } else {
      const payload = { ...formInput, userId: user.id };
      createPost(payload).then(() => router.push('/feed'));
    }
  };
  return (
    <div className="flex w-[500px] mx-auto inter-normal">
      <div className="flex-grow mt-32">
        <Form onSubmit={handleSubmit}>
          <Form.Label>{obj.id ? 'Update' : 'Create'} Post</Form.Label>
          {/* TITLE INPUT  */}
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Control type="text" placeholder="Enter a title" name="title" value={formInput.title} onChange={handleChange} className="input rounded-none" required />
          </Form.Group>
          {/* POST CONTENT TEXTAREA  */}
          <Form.Group controlId="formContent" className="mb-3">
            <Form.Control as="textarea" placeholder="Content" style={{ height: '100px' }} name="content" value={formInput.content} onChange={handleChange} className="input rounded-none" required />
          </Form.Group>
          {/* POST IMAGE URL  */}
          <Form.Group controlId="formBasicImage" className="mb-3">
            <Form.Control type="url" name="image" placeholder="Enter an image URL" value={formInput.imageUrl} onChange={handleChange} className="input rounded-none" />
          </Form.Group>
          {/* TAG SELECT  */}
          <Form.Group controlId="formSelect" className="mb-3">
            <Form.Select
              aria-label="Tags"
              name="tags"
              onChange={handleTagChange}
              className="mb-3 rounded-sm select"
              multiple
              value={obj.tag} // This should be an array of selected tag IDs
              required
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
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
    tagId: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    imageUrl: PropTypes.string,
    tag: PropTypes.string,
  }),
};
PostForm.defaultProps = {
  obj: initialState,
};
