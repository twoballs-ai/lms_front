"use client"; // This directive must be at the top
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SiteService from "../../services/siteNoAuth.service";
import CustomCard from "../../components/reUseComponents/Cards";
import { serverUrl } from "../../shared/config";
import "./CategoryPage.scss";

interface Category {
    id: number;
    title: string;
}

interface Course {
    id: number;
    title: string;
    description: string;
    cover_path: string;
}

const CategoryPage: React.FC = () => {
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true); // Ensure the component is mounted before using the router
    }, []);

    const handleCardClick = (courseId: number) => {
        if (isMounted) {
            router.push(`/course-detail/${courseId}`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await SiteService.getCategory({ toSelect: false });
                if (categoryResponse.status === 200 || categoryResponse.status === 201) {
                    setCategoryData(categoryResponse.data.data);
                }
                fetchCourses();
            } catch (error) {
                console.error("Error fetching category data", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            document.title = `Курсы по категории - ${selectedCategory.title}`;
        } else {
            document.title = "Курсы по категории - Все категории";
        }
    }, [selectedCategory]);

    const fetchCourses = async (category_id: number | null = null) => {
        const params: { category_id?: number } = {};
        if (category_id) {
            params.category_id = category_id;
        }
        try {
            const coursesResponse = await SiteService.getCourses(params);
            if (coursesResponse.status === 200 || coursesResponse.status === 201) {
                setAllCourses(coursesResponse.data.data);
            }
        } catch (error) {
            console.error("Error fetching courses data", error);
        }
    };

    const handleCategorySelect = (category: Category | null) => {
        setSelectedCategory(category);
        fetchCourses(category ? category.id : null);
    };

    if (!isMounted) {
        return null; // Avoid using the router before the component is mounted
    }

    return (
        <div className="category-page">
            <div className="category-filter">
                <button className="category-button" onClick={() => handleCategorySelect(null)}>
                    Показать все курсы
                </button>
                {categoryData.map((category) => (
                    <button
                        key={category.id}
                        className="category-button"
                        onClick={() => handleCategorySelect(category)}
                    >
                        {category.title}
                    </button>
                ))}
            </div>
            <p>
                Выбрана категория:{" "}
                {selectedCategory ? selectedCategory.title : "Нет выбранной категории"}
            </p>
            <div className="courses-list">
                {allCourses.map((course) => (
                    <div
                        key={course.id}
                        className="card-wrapper"
                        onClick={() => handleCardClick(course.id)}
                    >
                        <CustomCard
                            title={course.title}
                            description={course.description}
                            image={`${serverUrl}/${course.cover_path}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
