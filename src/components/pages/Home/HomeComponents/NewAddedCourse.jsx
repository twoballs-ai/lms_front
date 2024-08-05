import React from "react";
import { Link } from "react-router-dom";
import CustomCard from "../../../reUseComponents/Cards";
import { serverUrl } from "../../../../shared/config";
// import styles from './NewAddedCourse.module.scss';

function NewAddedCourse(props) {
    let lastAddedCourses = props.lastAddedCourses;

    return (
        <div className={'home-container__last-added-course'}>
{lastAddedCourses.length !== 0 ? (
    lastAddedCourses.map((course) => (
        <div key={course.id} className="card-wrapper">
            <Link to={`/detail/${course.id}`}>
                <CustomCard
                    title={course.title}
                    description={course.description}
                    image={`${serverUrl}/${course.cover_path}`} // Replace with actual image URL if available
                />
            </Link>
        </div>
    ))
) : <p>Ожидайте появления курсов</p>}

        </div>
    );
}

export default NewAddedCourse;