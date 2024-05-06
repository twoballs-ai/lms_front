import React, { useState, useEffect } from "react";

function About() {
    return (
        <div className="mx-3">
            <div className="shadow rounded p-3 mt-3 mb-5">
                <div className="px-5 py-5">
                    <div>
                        <div as="h5">Немного о компании</div>
                        <div>
                            <div>
                                Intellity code - сайт для изучения
                                программирования.
                            </div>
                            <div>
                                Сюда мы напишем что ни будь, но потом.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
