import React, { useState, useEffect } from "react";





import { Link, useParams } from "react-router-dom";


import axios from "axios";
import { apiLmsUrl } from "../../../shared/config";
import SiteService from "../../../services/site.service";

function CategoryPage() {

    const [categoryData, setCategoryData] = useState([]);

    // const teacherId = localStorage.getItem('teacherId')
    // console.log(teacherId)
    useEffect(() => {
        const fetchData = async () => {
            await SiteService.getCategory().then((response) => {
                if (response.status === 200 || response.status === 201) {
                    console.log(response.data)
                    setCategoryData(response.data.data);
                }
            });
        };
        fetchData();
    }, []);


    return (
        <div className="mx-3">
            <div className="shadow rounded p-3 mt-3 mb-5">
                <h3 className="mt-5">Все категории</h3>
                <div className="mt-5">
                    <hr />
                    {categoryData &&
                        categoryData.map((row, index) => (
                            <div>
                                <div style={{ width: "18rem" }}>
                                    <div>
                                        <div>
                                            <Link
                                                className="text-decoration-none text-info"
                                                to={`/courses-by-cat/${row.id}/${row.title}`}
                                            >
                                                Категория {row.title}. кол-во
                                                курсов: ({row.total_courses})
                                            </Link>
                                        </div>
                                        <div>{row.description}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
export default CategoryPage;
