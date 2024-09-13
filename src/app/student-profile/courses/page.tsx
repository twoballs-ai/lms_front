"use client"; // Required for client-side rendering in Next.js

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import StudentService from "@/services/student.service";
import LmsButton from "@/components/reUseComponents/Button";
import "./StudentMyCourses.scss";

interface Course {
  id: string;
  title: string;
}

const StudentMyCourses: React.FC = () => {
  const [courseData, setCourseData] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StudentService.studentCourses();
        if (response.status === 200 || response.status === 201) {
          setCourseData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchData();
  }, []);

  const handlePassingCourseClick = (course_id: string) => {
    router.push(`/course-learning/${course_id}`);
  };

  return (
    <div className="my-courses-container">
      <div className="my-courses-container__title">Мои курсы</div>
      {courseData.map((course) => (
        <div key={course.id} className="my-courses-container__course-item">
          <div className="course-item__course-title">{course.title}</div>
          <div className="course-item__course-actions">
            <LmsButton 
              buttonText={"Проходить курс"} 
              handleClick={() => handlePassingCourseClick(course.id)} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentMyCourses;
