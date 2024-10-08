import React from 'react';
import Link from 'next/link'; // Import Next.js Link
import parse from 'html-react-parser';
import Head from 'next/head'; // Use Head for setting the title
import './ViewBlogs.scss';
import SiteService from '@/services/siteNoAuth.service';

// Define blog data type
interface Blog {
  id: number;
  category: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at?: string;
}

// This is an async component
const ViewBlogs = async () => {
  // Fetch the blog data
  const response = await SiteService.getNewsBlog();
  const blogs: Blog[] = response.status === 200 || response.status === 201 ? response.data.data : [];

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const truncateContent = (content: string) => {
    const lines = content.split(/<br\s*\/?>|<\/p>|<\/div>|<\/li>/).slice(0, 2).join(' ') + '...';
    return parse(lines);
  };

  return (
    <>
      <Head>
        <title>Новости учебного портала courserio</title>
      </Head>
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
    </>
  );
};

export default ViewBlogs;
