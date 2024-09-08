'use client'; // Указывает, что компонент должен быть отрендерен на клиенте

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Используем useParams для получения параметров маршрута
import parse from 'html-react-parser';
import SiteService from '../../../services/siteNoAuth.service';
import './NewsDetail.scss';

// Определяем интерфейс для данных блога
interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  created_at: string;
  updated_at?: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams(); // Получаем параметр id из маршрута
  const [blog, setBlog] = useState<Blog | null>(null); // Состояние для хранения данных блога

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (id) { // Проверяем наличие id перед запросом
        try {
          const response = await SiteService.getBlogById(id);
          if (response.status === 200 || response.status === 201) {
            setBlog(response.data.data);
          }
        } catch (error) {
          console.error('Ошибка при получении блога:', error);
        }
      }
    };
    fetchBlogDetail();
  }, [id]);

  useEffect(() => {
    if (blog && blog.title) {
      document.title = `${blog.title} - courserio.ru`; // Устанавливаем заголовок страницы после загрузки данных блога
    }
  }, [blog]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  if (!blog) return <p>Загрузка...</p>; // Показываем сообщение о загрузке, пока данные не загружены

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <p className="author">Автор: {blog.author}</p>
      <div className="content">{parse(blog.content)}</div>
      <p className="news-category">{blog.category}</p>
      {blog.updated_at ? (
        <p className="date">Обновлено: {formatDate(blog.updated_at)}</p>
      ) : (
        <p className="date">Создано: {formatDate(blog.created_at)}</p>
      )}
    </div>
  );
};

export default BlogDetail;
