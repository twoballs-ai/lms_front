// CreateBlog.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/news/', {
        title,
        content,
        category_id: categoryId,
      });
      setMessage('Blog created successfully!');
      setTitle('');
      setContent('');
      setCategoryId('');
    } catch (error) {
      setMessage('Error creating blog.');
    }
  };

  return (
    <div>
      <h2>Create a new Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category ID</label>
          <input
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Blog</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateBlog;
