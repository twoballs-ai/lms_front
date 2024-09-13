"use client"; // For client-side rendering in Next.js
import React, { useState, useEffect } from "react";
import SiteService from "@/services/siteNoAuth.service"; // Update path based on your project
import NewAddedCourse from "@/components/HomeComponents/NewAddedCourse"; // Update path based on your project
import LatestNews from "@/components/HomeComponents/LatestNews"; // Update path based on your project
import "./app.scss";

// Updated Course interface with description and cover_path
interface Course {
  id: number;
  title: string;
  description: string;
  cover_path: string;
}

export default function Home() {
  const [lastAddedCourses, setLastAddedCourses] = useState<Course[]>([]);
  const [teacherId, setTeacherId] = useState<boolean>(false);
  const items = "8";

  useEffect(() => {
    document.title = "Courserio - Lms - цифровая платформа обучения";
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("access_token")) {
      setTeacherId(true);
    }
  }, [teacherId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SiteService.homePageLastAddedCourses({ items });
        if (response.status === 200 || response.status === 201) {
          setLastAddedCourses(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="main-container__home-container">
        <p>Недавно добавленные курсы</p>
        <NewAddedCourse lastAddedCourses={lastAddedCourses} />
        <p>Последние новости</p>
        <LatestNews />
      </div>
    </>
  );
}
