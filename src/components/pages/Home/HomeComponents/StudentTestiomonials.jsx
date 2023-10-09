import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
function StudentTestimonials(props) {
    let studentTestimonialData = props.studentTestimonialData;
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    console.log(props);
    return (

        <div className="shadow rounded p-3 my-5">
             <h3 className="mt-5">Отзывы студентов о курсах</h3>
                <hr className="bg-info" />

                <Carousel
                    className="bg-dark text-white py-5"
                    activeIndex={index}
                    onSelect={handleSelect}
                >
                    {studentTestimonialData &&
                        studentTestimonialData.map((row, index) => (
                            <Carousel.Item>
                                <blockquote className="blockquote mb-0 text-center">
                                    <p>{row.review}</p>
                                    <footer className="blockquote-footer">
                                        название курса: {row.course.title}
                                        <cite title="Source Title">
                                            <br />
                                            Студент: {row.student.full_name}
                                        </cite>
                                    </footer>
                                </blockquote>

                                <Carousel.Caption></Carousel.Caption>
                            </Carousel.Item>
                        ))}
                </Carousel>
            </div>

    );
}
export default StudentTestimonials;
