// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import axios from "axios";
// import Editor from "../../../../../Editor";
// import { apiUrl, typesApiUrl } from "../../../../../../shared/config";
// import CodeEditor from "../../../../../CodeEditor";
// function AddingCodeLesson(props) {
//     let stagePk = props.stagePk
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [programmingLessonData, setProgrammingLessonData] = useState({
//         stage: stagePk,
//         is_video: true,
//         video_lesson: "",
//         description: ""
//     });
//     const [valueEditor, setValueEditor] = useState('')
//     const handleChangeContent = (valueEditor) => {
//         setValueEditor(valueEditor)
//         console.log(valueEditor)
//     }
//     const [valueCodeEditor, setValueCodeEditor] = useState('')
//     const handleChangeCodeContent = (valueEditor) => {
//         setValueCodeEditor(valueCodeEditor)
//         console.log(valueCodeEditor)
//     }
//     console.log(location.state);

//     const handleChange = (event) => {
//         setProgrammingLessonData({
//             ...programmingLessonData,
//             [event.target.name]: event.target.value,
//         });
//         console.log(programmingLessonData);
//     };

//     const formSubmit = (e) => {
//         e.preventDefault();

//         axios
//             .post(
//                 typesApiUrl + "video-lesson/" + stage_id,
//                 programmingLessonData,
//                 // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
//                 { headers: { "Content-Type": "multipart/form-data" } }
//             )
//             .then((response) => {
//                 console.log(response.status)
//                 navigate(-2);
//             });
//     };
//     return (
//         <div>
//             {location.state.type === "codingLesson" && (
//                 <div className="mt-3 mx-3">
//                     <div>
//                         Добавление урока на программирование
//                     </div>
//                     <div>
//                         <Editor onChange={handleChangeContent} />
//                         <Form>
//                             <div className="mt-5">
//                                 <CodeEditor onChange={handleChangeCodeContent} />
//                             </div>

//                             <Button
//                                 onClick={formSubmit}
//                                 variant="primary"
//                                 type="submit"
//                             >
//                                 Submithg
//                             </Button>
//                         </Form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default AddingCodeLesson