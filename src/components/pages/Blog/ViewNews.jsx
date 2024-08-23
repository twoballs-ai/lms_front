import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import SiteService from '../../../services/siteNoAuth.service';
import './ViewBlogs.scss';

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    document.title = 'Новости учебного портала courserio';
  }, []);

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

  const truncateContent = (content) => {
    const lines = content.split(/<br\s*\/?>|<\/p>|<\/div>|<\/li>/).slice(0, 2).join(' ') + '...';
    return parse(lines);
  };

  return (
    <div className="blog-posts">
      <h1>Новостной блог Courserio и наших тьюторов</h1>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <ul className="blog-list">
          {blogs.map((blog) => (
            <li className="blog-card" key={blog.id}>
              <p className="news-category">{blog.category}</p>
              <h3>{blog.title}</h3>
              <div className="content">
                {truncateContent(blog.content)}
                <Link to={`/news-blog/${blog.id}`} className="read-more">
                  Читать далее
                </Link>
              </div>
  
              <p className="author">Автор: {blog.author}</p>
              {blog.updated_at ? (
                <p className="date">Обновлено: {formatDate(blog.updated_at)}</p>
              ) : (
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
