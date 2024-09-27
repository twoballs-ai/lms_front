import React from "react";
import "./CustomCardNew.scss"; // Импорт стилей без использования CSS-модулей

// Интерфейс для свойств карточки
interface CustomCourseCardProps {
  title: string;
  description: string;
  image: string;
}

const CustomCourseCard: React.FC<CustomCourseCardProps> = ({ title, description, image }) => {
  return (
    <div className="custom-course-card">
      <div className="custom-course-card__image">
        <img src={image} alt={title} />
      </div>
      <div className="custom-course-card__body">
        <h3 className="body__title">{title}</h3>
        <p className="body__description">{description}</p> {/* Изолированный стиль для p */}
      </div>
    </div>
  );
};

export default CustomCourseCard;
