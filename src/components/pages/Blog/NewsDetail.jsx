// src/components/BlogDetail/BlogDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import SiteService from '../../../services/siteNoAuth.service';
import './NewsDetail.scss';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      await SiteService.getBlogById(id).then((response) => {
        if (response.status === 200 || response.status === 201) {
          setBlog(response.data.data);
        }
      });
    };
    fetchBlogDetail();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <p className="author">Автор: {blog.author}</p>
      <div className="content">{parse(blog.content)}</div>
      {blog.updated_at ? (
        <p className="date">Обновлено: {formatDate(blog.updated_at)}</p>
      ) : (
        <p className="date">Создано: {formatDate(blog.created_at)}</p>
      )}
    </div>
  );
};

export default BlogDetail;
