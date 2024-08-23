import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import SiteService from '../../../../services/siteNoAuth.service';

import './LatestNews.scss';

const LatestNews = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        
        
        const items =3
      await SiteService.getNewsBlog(items).then((response) => {
        if (response.status === 200 || response.status === 201) {
          setBlogs(response.data.data); // Limit to 3 blogs
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
    <div className="news-blog-posts">
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

export default LatestNews;
