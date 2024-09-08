import React, { useState, useEffect } from "react"





import { Link } from "react-router-dom";

import axios from "axios";
import { apiUrl } from "../../../shared/config";

function PopularTeachers() {
    const [popularTeacher, setPopularTeacher] = useState(null);
    useEffect(() => {
        axios.get(apiUrl + "/teacher/").then((res) => {
            setPopularTeacher(res.data);
        });
    }, []);

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>
        );
    }

    const paginationBasic = (
        <div>
            <Pagination className="mt-5 justify-content-center">
                {items}
            </Pagination>
        </div>
    );
    return (
        <>
            <div>
                <h3 className="mt-5">Рейтинг популярных преподавателей</h3>
                <div className="mt-5">
                    <hr />
                    <div>
                        <div style={{ width: "18rem" }}>
                            <Link to={"detail/1"}>
                                <div.Img
                                    variant="top"
                                    src="/images/code.jpg"
                                />
                            </Link>
                            <div>
                                <div>
                                    <Link to={"/teacher-detail/1"}>
                                        Имя учителя
                                    </Link>
                                </div>
                            </div>
                            <div.Footer>
                                Рейтинг наставника: 4.6 Сердечко
                            </div.Footer>
                        </div>
                    </div>
                    <div>
                        <div style={{ width: "18rem" }}>
                            <div.Img variant="top" src="/images/code.jpg" />
                            <div>
                                <div>
                                    <Link to={"/teacher-detail/1"}>
                                        Имя учителя
                                    </Link>
                                </div>
                            </div>
                            <div.Footer>
                                Рейтинг наставника: 4.6 Сердечко
                            </div.Footer>
                        </div>
                    </div>
                    <div>
                        <div style={{ width: "18rem" }}>
                            <div.Img variant="top" src="/images/code.jpg" />
                            <div>
                                <div>
                                    <Link to={"/teacher-detail/1"}>
                                        Имя учителя
                                    </Link>
                                </div>
                            </div>
                            <div.Footer>
                                Рейтинг наставника: 4.6 Сердечко
                            </div.Footer>
                        </div>
                    </div>
                    <div>
                        <div style={{ width: "18rem" }}>
                            <div.Img variant="top" src="/images/code.jpg" />
                            <div>
                                <div>
                                    <Link to={"/teacher-detail/1"}>
                                        Имя учителя
                                    </Link>
                                </div>
                            </div>
                            <div.Footer>
                                Рейтинг наставника: 4.6 Сердечко
                            </div.Footer>
                        </div>
                    </div>
                </div>
                {paginationBasic}
            </div>
        </>
    );
}
export default PopularTeachers;
