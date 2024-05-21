import React, { useState, useEffect } from "react"

import { Link } from "react-router-dom";
import CustomCard from "../../../reUseComponents/Cards";
function NewAddedCourse(props) {
    // let allCourseData = props.allCourseData
    // console.log(props)
    return (
        <div className="home-container__last-added-course">
                    <div className="shadow rounded p-3 mt-3 mb-5">
            <CustomCard
                title="Another Title"
                description="Another description"
                image="https://example.com/another-image.png"
            />
        </div>
        </div>

    );
}
export default NewAddedCourse;
