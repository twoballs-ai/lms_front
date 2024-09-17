// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://courserio.ru',
  generateRobotsTxt: true, // Генерация robots.txt
  changefreq: 'daily',    // Частота обновления страниц
  priority: 0.7,          // Приоритет страниц
  sitemapSize: 5000,      // Максимум URL в одном файле sitemap
  additionalPaths: async (config) => {
    // Определяем статические маршруты
    const staticPaths = [
      '/',
      '/about',
      '/category',
      '/license',
      '/news-blog',
      '/student-profile',
      '/teacher-profile',
      // Добавляем страницы из student-profile
      '/student-profile/courses',
      '/student-profile/dashboard',
      // Добавляем страницы из teacher-profile
      '/teacher-profile/add-course',
      '/teacher-profile/dashboard',
      '/teacher-profile/my-courses',
      '/teacher-profile/profile-settings',
      '/teacher-profile/reset-password',
    ];

    // Динамические маршруты (пример)
    const dynamicPaths = [
      // Пример динамических маршрутов с разными ID
      '/course-detail/1',
      '/course-detail/2',
      '/course-editor/1',
      '/course-editor/2',
      '/course-learning/1',
      '/course-learning/2',
      '/course-settings/1',
      '/course-settings/2',
      '/news-blog/1',
      '/news-blog/2',
    ];

    // Возвращаем список маршрутов для карты сайта
    return [...staticPaths, ...dynamicPaths].map((path) => ({
      loc: path,
      lastmod: new Date().toISOString(),
    }));
  },
};

module.exports = config;
