"use client"; // Required for client-side rendering in Next.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Use Next.js Link
import parse from 'html-react-parser';
import SiteService from '../../services/siteNoAuth.service';
import './LatestNews.scss'; // Import SCSS styles

// Define types for the blog data structure
interface Blog {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  created_at: string;
  updated_at?: string;
}

const LatestNews: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]); // Use TypeScript typing for the blogs array

  useEffect(() => {
    const fetchData = async () => {
      const items = 3;
      const response = await SiteService.getNewsBlog(items);
      if (response.status === 200 || response.status === 201) {
        setBlogs(response.data.data); // Set the blogs data
      }
    };
    fetchData();
  }, []);

  // Format date using TypeScript's built-in Date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: 'long', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  // Truncate content and parse HTML
  const truncateContent = (content: string) => {
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
                {/* Use Next.js Link for routing */}
                <Link href={`/news-blog/${blog.id}`} className="read-more">
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
