const fs = require('fs');
const path = require('path');

// Основной URL вашего сайта
const baseUrl = 'http://yourdomain.com';

// Список всех URL для карты сайта
const urls = [
  '/',
  '/about',
  '/category',
  '/logout',
  '/detail/:course_id',
  '/student-profile',
  '/student-profile/my-courses',
  '/student-profile/profile-settings',
  '/student-profile/reset-password',
  '/teacher-profile',
  '/teacher-profile/my-courses',
  '/teacher-profile/add-course',
  '/teacher-profile/profile-settings',
  '/teacher-profile/reset-password',
  '/course-editor/:course_id',
  '/course-settings/:course_id',
  '/course-learning/:course_id',
];

// Текущая дата в формате ISO 8601
const currentDate = new Date().toISOString();

// Функция для генерации sitemap.xml
const generateSitemap = () => {
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  const urlsetStart = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const urlsetEnd = `</urlset>\n`;

  let urlsContent = '';
  urls.forEach(url => {
    urlsContent += `  <url>\n`;
    urlsContent += `    <loc>${baseUrl}${url}</loc>\n`;
    urlsContent += `    <lastmod>${currentDate}</lastmod>\n`;
    urlsContent += `    <changefreq>weekly</changefreq>\n`;
    urlsContent += `    <priority>0.8</priority>\n`;
    urlsContent += `  </url>\n`;
  });

  const sitemapContentFull = sitemapContent + urlsetStart + urlsContent + urlsetEnd;

  fs.writeFile(sitemapPath, sitemapContentFull, (err) => {
    if (err) {
      console.error('Error writing sitemap file:', err);
    } else {
      console.log('Sitemap generated successfully.');
    }
  });
};

// Функция для генерации robots.txt
const generateRobotsTxt = () => {
  const robotsPath = path.join(__dirname, 'public', 'robots.txt');
  const robotsContent = `User-agent: *\n`;
  const robotsAllowAll = `Disallow: \n`;

  const robotsContentFull = robotsContent + robotsAllowAll;

  fs.writeFile(robotsPath, robotsContentFull, (err) => {
    if (err) {
      console.error('Error writing robots.txt file:', err);
    } else {
      console.log('Robots.txt generated successfully.');
    }
  });
};

// Вызов функций для генерации sitemap.xml и robots.txt
generateSitemap();
generateRobotsTxt();
