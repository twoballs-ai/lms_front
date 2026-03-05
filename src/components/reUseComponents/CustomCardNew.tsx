import React from "react";
import ImageViewer from "./ImageViewer"; // Импорт компонента ImageViewer
import "./CustomCardNew.scss";

interface CustomCourseCardProps {
  title: string;
  description: string;
  image: string;
}

const CustomCourseCard: React.FC<CustomCourseCardProps> = ({ title, description, image }) => {
  return (
    <div className="custom-course-card">
      <div className="custom-course-card__image">
        <ImageViewer src={image} alt={title}/> {/* Использование ImageViewer */}
      </div>
      <div className="custom-course-card__body">
        <h3 className="body__title">{title}</h3>
        <p className="body__description">{description}</p>
      </div>
    </div>
  );
};

export default CustomCourseCard;
