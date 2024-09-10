"use client"; // Ensure you're using this directive for client-side components

import React from "react";
import { useRouter } from "next/navigation"; // Use Next.js router
import CustomCard from "../reUseComponents/Cards";
import { serverUrl } from "../../shared/config";

// Define the type for course
interface Course {
  id: number;
  title: string;
  description: string;
  cover_path: string;
}

// Define the props interface
interface NewAddedCourseProps {
  lastAddedCourses: Course[];
}

const NewAddedCourse: React.FC<NewAddedCourseProps> = ({ lastAddedCourses }) => {
  const router = useRouter(); // Use Next.js router instead of react-router-dom

  const handleCardClick = (courseId: number) => {
    router.push(`/course-detail/${courseId}`);
  };

  return (
    <div className="home-container__last-added-course">
      {lastAddedCourses.length !== 0 ? (
        lastAddedCourses.map((course) => (
          <div
            key={course.id}
            className="card-wrapper"
            onClick={() => handleCardClick(course.id)}
          >
            <CustomCard
              title={course.title}
              description={course.description}
              image={`${serverUrl}/${course.cover_path}`} // Replace with actual image URL if available
            />
          </div>
        ))
      ) : (
        <p>Ожидайте появления курсов</p>
      )}
    </div>
  );
};

export default NewAddedCourse;
