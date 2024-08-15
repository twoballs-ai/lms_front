import React from "react";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../../reUseComponents/Cards";
import { serverUrl } from "../../../../shared/config";

function NewAddedCourse(props) {
    const navigate = useNavigate();
    let lastAddedCourses = props.lastAddedCourses;

    const handleCardClick = (courseId) => {
        navigate(`/detail/${courseId}`);
    };

    return (
        <div className={'home-container__last-added-course'}>
            {lastAddedCourses.length !== 0 ? (
                lastAddedCourses.map((course) => (
                    <div key={course.id} className="card-wrapper" onClick={() => handleCardClick(course.id)}>
                        <CustomCard
                            title={course.title}
                            description={course.description}
                            image={`${serverUrl}/${course.cover_path}`} // Replace with actual image URL if available
                        />
                    </div>
                ))
            ) : <p>Ожидайте появления курсов</p>}
        </div>
    );
}

export default NewAddedCourse;