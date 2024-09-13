// "use client"; // Required for client-side rendering in Next.js

// import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Form, Button, Image } from "react-bootstrap"; // Assuming you're using react-bootstrap
// import "./StudentProfileSettings.scss";

// const apiUrl = "your_api_url_here"; // Replace with your actual API URL

// interface StudentData {
//   full_name: string;
//   email: string;
//   username: string;
//   interested_categories: string;
//   status: string;
//   previous_student_image: string;
//   student_image: File | null;
// }

// const StudentProfileSettings: React.FC = () => {
//   const studentId = localStorage.getItem("studentId");
//   const [studentData, setStudentData] = useState<StudentData>({
//     full_name: "",
//     email: "",
//     username: "",
//     interested_categories: "",
//     status: "",
//     previous_student_image: "",
//     student_image: null,
//   });
//   const router = useRouter();

//   useEffect(() => {
//     if (studentId) {
//       axios
//         .get(`${apiUrl}student/${studentId}`)
//         .then((response) => {
//           setStudentData({
//             full_name: response.data.full_name,
//             email: response.data.email,
//             username: response.data.username,
//             interested_categories: response.data.interested_categories,
//             previous_student_image: response.data.student_image,
//             student_image: null,
//           });
//           console.log(response.data);
//         })
//         .catch((error) => console.error("Failed to fetch student data:", error));
//     }
//   }, [studentId]);

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setStudentData({
//       ...studentData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setStudentData({
//         ...studentData,
//         [event.target.name]: event.target.files[0],
//       });
//     }
//   };

//   const submitForm = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const _formData = new FormData();
//     _formData.append("full_name", studentData.full_name);
//     _formData.append("email", studentData.email);
//     _formData.append("interested_categories", studentData.interested_categories);
//     _formData.append("username", studentData.username);
//     if (studentData.student_image) {
//       _formData.append("student_image", studentData.student_image, studentData.student_image.name);
//     }
//     console.log(studentData);
//     try {
//       const response = await axios.put(`${apiUrl}student/${studentId}/`, _formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log(response);
//       if (response.status === 200) {
//         // Handle successful response if needed
//       }
//     } catch (error) {
//       console.log(error);
//       setStudentData({ ...studentData, status: "error" });
//     }
//   };

//   const studentLoginStatus = localStorage.getItem("studentLoginStatus");
//   if (studentLoginStatus !== "true") {
//     router.push("/student-login");
//   }

//   return (
//     <div>
//       <div>
//         <h3>Изменение настроек профиля</h3>
//       </div>
//       <div>
//         <Form onSubmit={submitForm}>
//           <Form.Group className="mb-3" controlId="formBasicFullName">
//             <Form.Label>ФИО</Form.Label>
//             <Form.Control
//               value={studentData.full_name}
//               name="full_name"
//               onChange={handleChange}
//               type="text"
//               placeholder="Введите ваше ФИО"
//             />
//           </Form.Group>
//           <Form.Group controlId="formFile" className="mb-3">
//             <Form.Label>Добавить картинку портфолио</Form.Label>
//             <Form.Control
//               name="student_image"
//               type="file"
//               onChange={handleFileChange}
//             />
//           </Form.Group>
//           {studentData.previous_student_image && (
//             <Image
//               src={studentData.previous_student_image}
//               rounded
//               width={400}
//             />
//           )}
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               value={studentData.email}
//               name="email"
//               onChange={handleChange}
//               type="email"
//               placeholder="Введите ваш email"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicUsername">
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               value={studentData.username}
//               name="username"
//               onChange={handleChange}
//               type="text"
//               placeholder="Введите ваш username"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicCategories">
//             <Form.Label>Интересные категории</Form.Label>
//             <Form.Control
//               value={studentData.interested_categories}
//               name="interested_categories"
//               onChange={handleChange}
//               type="text"
//               placeholder="Введите интересные категории"
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Обновить профиль
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default StudentProfileSettings;
