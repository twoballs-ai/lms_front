import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteService from "../../../services/siteNoAuth.service";
import "./CategoryPage.scss";
import CustomCard from "../../reUseComponents/Cards";
import { serverUrl } from "../../../shared/config";

function CategoryPage() {
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allCourses, setAllCourses] = useState([]);
    const navigate = useNavigate();

    const handleCardClick = (courseId) => {
        navigate(`/detail/${courseId}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            const categoryResponse = await SiteService.getCategory({ toSelect: false });
            if (categoryResponse.status === 200 || categoryResponse.status === 201) {
                setCategoryData(categoryResponse.data.data);
            }
            fetchCourses();
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Update the document title when selectedCategory changes
        if (selectedCategory) {
            document.title = `Курсы по категории - ${selectedCategory.title}`;
        } else {
            document.title = 'Курсы по категории - Все категории';
        }
    }, [selectedCategory]);

    const fetchCourses = async (category_id = null) => {
        const params = {};
        if (category_id) {
            params.category_id = category_id;
        }
        const coursesResponse = await SiteService.getCourses(params);
        if (coursesResponse.status === 200 || coursesResponse.status === 201) {
            setAllCourses(coursesResponse.data.data);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        fetchCourses(category ? category.id : null);
    };

    return (
        <div className="category-page">
            <div className="category-filter">
                <button
                    className="category-button"
                    onClick={() => handleCategorySelect(null)}
                >
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
                {selectedCategory
                    ? selectedCategory.title
                    : "Нет выбранной категории"}
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
}

export default CategoryPage;
