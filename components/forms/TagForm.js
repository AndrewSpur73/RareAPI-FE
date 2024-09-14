import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { createTag, editTag } from '../../api/tagData';

const initialState = {
  name: '',
};

export default function TagForm({ tagObj }) {
  const [formInput, setFormInput] = useState({ ...initialState });
  const router = useRouter();

  useEffect(() => {
    if (tagObj) setFormInput(tagObj);
  }, [tagObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { ...formInput };
    console.warn(payload);
    if (tagObj.id) {
      payload = { ...formInput, id: tagObj.id };
      editTag(payload).then(() => router.push('/tags'));
    } else {
      createTag(payload).then(() => router.push('/tags'));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {console.warn(tagObj)}
      <Form.Group as={Col} md="6" controlId="validationName">
        <Form.Label>Tag Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter tag name"
          name="name"
          value={formInput.name || ''}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a tag name.
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">Finish</Button>
    </Form>
  );
}

TagForm.propTypes = {
  tagObj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
};

TagForm.defaultProps = {
  tagObj: initialState,
};
