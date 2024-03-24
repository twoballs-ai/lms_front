import React, {useEffect, useState} from "react";
import axios from "axios";
import { apiLmsUrl } from "../../../../../shared/config";
import { useNavigate } from "react-router-dom";
export default function ModulesList({chapter}){
    // const [getModules, setGetModules] = useState([])
    // setGetModules()
    const navigate = useNavigate();
    const handleClick = (module_id) => {
        navigate(`edit-module/${module_id}`);
      }
            //    <Link
               
            //         className="nav-link text-light"
            //         to={
            //             "/edit-course-full/edit-module/" +
            //             course_id +
            //             "/" +
            //             item.id +
            //             "/stage/1"
            //         }
            //         key={item.id}
            //     >
            //         {item.title}
            //     </Link>
    return(
        <>
        <div className="chapters__modules">
        {chapter.modules.map((module)=>(
           <div key={module.id} className="modules__block" onClick={(e) => handleClick(module.id)}>{module.title}</div>
        ))}
        </div>
        </>
    )
}