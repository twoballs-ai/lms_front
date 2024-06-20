import React, { useState, useEffect } from 'react';
import SiteService from '../../../services/siteNoAuth.service';
import './ViewBlogs.scss';

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await SiteService.getNewsBlog().then((response) => {
        if (response.status === 200 || response.status === 201) {
          setBlogs(response.data.data);
        }
      });
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="blog-posts">
      <h2>Добро пожаловать в наш блог, здесь будут отображаться новости проекта и новости тьюторов</h2>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <ul className="blog-list">
          {blogs.map((blog) => (
            <li className="blog-card" key={blog.id}>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              {blog.updated_at && (
                <p className="date">Обновлено: {formatDate(blog.updated_at)}</p>
              )}
              {!blog.updated_at && (
                <p className="date">Создано: {formatDate(blog.created_at)}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewBlogs;
