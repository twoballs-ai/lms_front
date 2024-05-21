import React, { useState, useEffect } from "react"

import { Link } from "react-router-dom";
import CustomCard from "../../../reUseComponents/Cards";
function NewAddedCourse(props) {
    let lastAddedCourses = props.lastAddedCourses
    console.log(lastAddedCourses)
    return (
        <div className="home-container__last-added-course">
            
            
            {lastAddedCourses && lastAddedCourses.map((course) => (
                <CustomCard
                    key={course.id}
                    title={course.title}
                    description={course.description}
                    image="https://example.com/default-image.png" // Replace with actual image URL if available
                />
            ))}
        </div>

    );
}
export default NewAddedCourse;
