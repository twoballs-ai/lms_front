"use client"; // Указание на клиентский компонент

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { serverUrl } from "../../../shared/config";

import SiteService from "../../../services/siteNoAuth.service";
import ImageViewer from "../../../components/reUseComponents/ImageViewer";
import LmsButton from "../../../components/reUseComponents/LmsButton";
import StudentService from "../../../services/student.service";
import "./CourseDetail.scss";

// Define the interface for course data
interface CourseData {
  title: string;
  description: string;
  cover_path: string;
  cover_image_name: string;
  teacher: {
    id: number;
    name: string;
    lastname: string;
  } | null;
  course_subscription: number;
}

function CourseDetail() {
  const router = useRouter();
  const params = useParams();
  const course_id = params.id;

  const [courseData, setCourseData] = useState<CourseData | null>(null); // Use CourseData interface
  const [userLoggedStatus, setUserLoggedStatus] = useState("");
  const [enrollStatus, setEnrollStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await SiteService.getCourse(course_id).then((response) => {
        if (response.status === 200 || response.status === 201) {
          if (response.data.data.length !== 0) {
            setCourseData(response.data.data);
            console.log(response.data.data);
          }
        }
      });
    };

    fetchData();

    const storedLoginStatus = localStorage.getItem("studentLoginStatus");
    const studentLoginStatus = storedLoginStatus
      ? JSON.parse(storedLoginStatus)
      : null;
    if (studentLoginStatus === "true") {
      setUserLoggedStatus("success");

      const fetchAuthData = async () => {
        try {
          const response = await StudentService.checkEnrollment(course_id);
          if (response.status === 200 || response.status === 201) {
            setEnrollStatus(response.data.enrolled_status);
          }
        } catch (error) {
          console.error("Failed to fetch enrollment status:", error);
        }
      };

      fetchAuthData();
    }
  }, [course_id]);

  useEffect(() => {
    if (courseData && courseData.title) {
      document.title = `${courseData.title} - courserio.ru`;
    }
  }, [courseData]);

  const enrollCourse = async () => {
    await StudentService.enrollToCourse(course_id).then((response) => {
      if (response.status === 200 || response.status === 201) {
        setEnrollStatus(response.data.enrolled_status);
      }
    });
  };

  const unsubscribeFromCourse = async () => {
    await StudentService.unenrollStudentLight(course_id).then((response) => {
      if (response.status === 200 || response.status === 201) {
        setEnrollStatus("not enrolled");
      }
    });
  };

  const handlePassingCourseClick = async () => {
    router.push(`/course-learning/${course_id}`);
  };

  return (
    <div className="main-container__course-detail">
      <div className="course-detail__course-info">
        <div className="course-info__image_wrap">
          {courseData && (
            <ImageViewer
              src={`${serverUrl}/${courseData.cover_path}`}
              alt={courseData.cover_image_name}
              width={400}
            />
          )}
        </div>
        <div className="course-info__info_wrap">
          <h1>Курс: {courseData?.title}</h1>
          <h3>Описание: {courseData?.description}</h3>
          <p>
            Автор курса:{" "}
            <a
              href={
                courseData?.teacher
                  ? `/teacher-detail/${courseData.teacher.id}`
                  : "#"
              }
            >
              {courseData?.teacher
                ? `${courseData.teacher.name} ${courseData.teacher.lastname}`
                : "Loading..."}
            </a>
          </p>
          <p>
            Всего подписавшихся пользователей: {courseData?.course_subscription}
          </p>
          <div className="info-wrap__enrol-buttons">
            {userLoggedStatus === "success" && (
              <>
                {enrollStatus === "enrolled" ? (
                  <>
                    <div style={{ width: "300px" }}>
                      <LmsButton
                        buttonText="Проходить курс"
                        handleClick={handlePassingCourseClick}
                      />
                    </div>

                    <span> Вы подписаны на курс и можете проходить его</span>
                    <div style={{ width: "300px" }}>
                      <LmsButton
                        buttonText="Отписаться от курса"
                        handleClick={unsubscribeFromCourse}
                      />
                    </div>

                    <span>
                      {" "}
                      Вы не потеряете ваш прогресс, просто перестанете получать
                      оповещения по курсу
                    </span>
                  </>
                ) : (
                  <div style={{ width: "300px" }}>
                    <LmsButton
                      buttonText="Подписаться на курс"
                      handleClick={enrollCourse}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="course-detail__similar-courses">
        <hr />
        <h3>Схожие курсы:</h3>
        <p>В разработке</p>
      </div>
    </div>
  );
}

export default CourseDetail;
