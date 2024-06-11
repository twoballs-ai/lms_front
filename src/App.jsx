import React, { createContext, useContext, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/pages/basicComponents/layouts';
// import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import MainComponent from './components/pages/TeacherProfile/CourseEditor/components/MainComponent';
import "./App.scss"
import About from './components/pages/About/About';
import CourseDetail from './components/pages/Course/CourseDetail';
// // import TeacherDetail from './components/pages/Course/TeacherDetail';
// // import AllCourses from './components/pages/AllCourses/AllCourses';
// // import PopularCourses from './components/pages/PopularCourses/PopularCourses';
// // import PopularTeachers from './components/pages/PopularTeachers/PopularTeachers';
// // import CoursesByCat from './components/pages/CoursesByCat/CoursesByCat';
// //student pages
// // import StudentLogin from './components/pages/Student/Login/Login';

import StudentDashboard from './components/pages/StudentProfile/ControlPanel/StudentCourseProfile/Dashboard';
import StudentMyCourses from './components/pages/StudentProfile/ControlPanel/StudentCourseProfile/MyCourses';
import UserDashmain from './components/pages/StudentProfile/ControlPanel/components/DashMain';
// import StudentFavoriteCourses from './components/pages/Student/ControlPanel/FavoriteCourse';
// import StudentRecommendCourses from './components/pages/Student/ControlPanel/RecommendCourses';
// import StudentProfileSettings from './components/pages/Student/ControlPanel/StudentProfileSettings';
// import StudentChangePassword from './components/pages/Student/ControlPanel/StudentChangePassword';
// import StudentIncomingTask from './components/pages/Student/ControlPanel/StudentTask';

// // quiz pages
// import AddQuiz from './components/pages/Teacher/ControlPanel/AddQuiz';

// //teacher pages
// // import TeacherLogin from './components/pages/Teacher/Login/Login';

import TeacherDashboard from './components/pages/TeacherProfile/ControlPanel/Dashboard';
import MyTeacherCourses from './components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/MyTeacherCourses';
import TeacherDashMain from './components/pages/TeacherProfile/ControlPanel/components/DashMain';
import AddCourse from './components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/AddCourse';
// // import AddChapter from './components/pages/Teacher/ControlPanel/AddChapter';
// // import EditChapter from './components/pages/Teacher/ControlPanel/EditChapter';
// // import MyStudents from './components/pages/Teacher/ControlPanel/MyStudents';
import TeacherProfileSettings from './components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/ProfileSettings';
import TeacherChangePassword from './components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/ChangePassword';
// // import Coursechapter from './components/pages/Teacher/ControlPanel/CourseChapters';
// // import EditCourse from './components/pages/Teacher/ControlPanel/EditCourse';
// // import SkillCourses from './components/pages/CoursesByCat/SkillCourses';
// // import EnrolledStudents from './components/pages/Teacher/ControlPanel/EnrolledStudents';
// // import AddTask from './components/pages/Teacher/ControlPanel/AddTask';
// // import ViewTask from './components/pages/Teacher/ControlPanel/ViewTask';
// // import MyTeacherQuizes from './components/pages/Teacher/ControlPanel/TeacherQuizes';
// // import EditQuiz from './components/pages/Teacher/ControlPanel/EditQuiz';
// // import QuizQuestion from './components/pages/Teacher/ControlPanel/QuizQuestion';
// // import AddQuizQuestion from './components/pages/Teacher/ControlPanel/AddQuizQuestion';
// // import AssignQuiz from './components/pages/Teacher/ControlPanel/AssignQuizToCourse';
// // import SearchByCourse from './components/pages/Search/Search';
// // import StudyMaterials from './components/pages/Teacher/ControlPanel/StudyMaterials';
// // import AddStudyMaterial from './components/pages/Teacher/ControlPanel/AddStudyMaterial';
// // import StudentStudyMaterials from './components/pages/Student/ControlPanel/StudyMaterials';
// // import CategoryPage from './components/pages/CoursesByCat/CategoryPage';
// // import VerifyOTPTeacher from './components/pages/Teacher/ControlPanel/VerifyTeacher';
// // import CourseStudy from './components/pages/Course/CourseStudy';
import EditorPageInfo from './components/pages/TeacherProfile/CourseEditor/FullCourseEdit/EditorPageInfo';
// import AddModule from './components/pages/Teacher/CourseEditor/FullCourseEdit/AddModule';
// // import EditModule from './components/pages/Teacher/FullCourseEdit/EditModule';
import EditModuleStage from './components/pages/TeacherProfile/CourseEditor/FullCourseEdit/EditModuleStage';
import CourseEditor from './components/pages/TeacherProfile/CourseEditor/components/LeftBar/CourseEditor';
// // import AddStageLesson from './components/pages/Teacher/CourseEditor/FullCourseEdit/AddStageLesson';
// // import StudentCourseLearn from './components/pages/Course/StudentCourseLearn';
import UserLogout from './components/pages/Auth/Logout/Logout';
import CategoryPage from './components/pages/CoursesByCat/CategoryPage';
// import MainComponent from './components/pages/Teacher/CourseEditor/components/MainComponent';
// import Layout from './components/pages/basicComponents/layouts';
// import StudentRegister from './components/Auth/TabComponent/RegisterComponents/StudentRegister/Register';
// import TeacherRegister from './components/Auth/TabComponent/RegisterComponents/TeacherRegister/Register';
import { Navigate } from 'react-router-dom';

import { AuthProvider } from './Commons/PrivateRouter/AuthProvider';
import PrivateRoute from './Commons/PrivateRouter/PrivateRoute';
import CoursePassingMainComponent from './components/pages/StudentProfile/CourseLearning/components/MainComponent';
import CoursePageInfo from './components/pages/StudentProfile/CourseLearning/FullCoursePassing/CoursePageInfo';
import CourseLearning from './components/pages/StudentProfile/CourseLearning/components/LeftBar/CourseLearning';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import SettingsOutlet from './components/pages/TeacherProfile/CourseSettings/SettingsOutlet';
import SettingsCourseInfo from './components/pages/TeacherProfile/CourseSettings/CourseSettingsPages/SettingsCourseInfo';
import EditCourse from './components/pages/TeacherProfile/CourseSettings/CourseSettingsPages/EditCourse';
// import EditCourse from './components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/EditCourse';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "detail/:course_id",
        element: <CourseDetail />,
      },
      { path: "about", element: <About /> },
  
      { path: "category", element: <CategoryPage /> },
      { path: "logout", element: <UserLogout /> },
    ]
  },
  {
    path: "student-profile",
    element: (
      <PrivateRoute requiredRole="student_model">
        <UserDashmain />
      </PrivateRoute>
    ),
    children: [
      { index: true,  element: <StudentDashboard /> },
      { path: "my-courses", element: <StudentMyCourses /> },
    ]
  },
  {
    path: "teacher-profile",
    element: (
      <PrivateRoute requiredRole="teacher_model">
        <TeacherDashMain />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <TeacherDashboard /> },
      { path: "my-courses", element: <MyTeacherCourses /> },
      { path: "add-course", element: <AddCourse /> },
      { path: "profile-settings", element: <TeacherProfileSettings /> },
      { path: "reset-password", element: <TeacherChangePassword /> },
    ]
  },
  {
    path: "25647580щ8/:course_id",
    element: (
      <PrivateRoute requiredRole="teacher_model">
        <MainComponent />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <EditorPageInfo /> },
      { path: "edit", element: <CourseEditor /> },
    ]
  },
  {
    path: "course-settings/:course_id",
    element: (
      <PrivateRoute requiredRole="teacher_model">
        <SettingsOutlet />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <SettingsCourseInfo /> },
      { path: "edit-info", element: <EditCourse /> },
    ]
  },
  {
    path: "course-learning/:course_id",
    element: (
      <PrivateRoute requiredRole="student_model">
        <CoursePassingMainComponent />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <CoursePageInfo /> },
      { path: "learning", element: <CourseLearning /> },
    ]
  },

  { path: '*', element: <Navigate to="/" /> },
]);

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />  {/* Add the ToastContainer here */}
  </AuthProvider>
);
export default App;


// function App() {





//   const router = createBrowserRouter([
//     {
//       path: "teacher-profile",
//       element: (
//         <PrivateRoute>
//           <TeacherDashMain />
//         </PrivateRoute>
//       ),
//       children: [
//         { index: true, element: <TeacherDashboard /> },
//         { path: "my-courses", element: <MyTeacherCourses /> },
//         { path: "add-course", element: <AddCourse /> },
//       ]
//     },
//     {7//       path: "ъ\:course_id",
//       element: (
//         <PrivateRoute>
//           <MainComponent />
//         </PrivateRoute>
//       ),
//       children: [
//         { index: true, element: <EditorPageInfo /> },
//         { path: "edit", element: <CourseEditor /> },
//       ]
//     },
//     { path: '*', element: <Navigate to="/" /> },

//     // {
//     //   path: "search/:searchString",
//     //   element: <SearchByCourse />,
//     // },
//     // {
//     //   path: "dashboard", 
//     //   element: <TeacherDashboard /> 
//     // },
//     // {
//     //   path: "all-chapters/:course_id",
//     //   element: <Coursechapter />,
//     // },
4
//     // {
//     //   path: "my-courses",
//     //   element: <StudentMyCourses />,
//     // },
//     // {
//     //   path: "my-courses",
//     //   element: <StudentMyCourses />,
//     // },
//     // {
//     //   path: "course-editor/",
//     //   element: <MainComponent />,
//     //   children: [
//     //     { 
//     //       index: true,
//     //       path: "editor-info/:course_id",
//     //       element: <EditorPageInfo /> 
//     //     },
//     //   ]
//     // }
//     //     <Route path='edit-course-full/' element={<MainComponent/>} >
//     //         <Route path='editor-info/:course_id' index element={<EditorPageInfo />} />
//     //         <Route path='add-chapter-full/:course_id' element={<AddChapter />} />
//     //         <Route path='add-module/:course_id/:chapter_id' element={<AddModule />} />
//     //         <Route path='edit-module/:course_id/:module_id' element={<EditModuleStage />} />
//     //         <Route path='edit-module/:course_id/:module_id/stage/:stage_id' element={<EditModuleStage />} />
//     //         <Route path='edit-module/:course_id/:module_id/stage/:stage_id/new' element={<AddStageLesson />} />
//     //       </Route>

//     //       ]
//     //     },
//     //   ],
//     // },
//     // other pages....

//   ])

//   return (
//     <AuthProvider> {/* Обертка вашего приложения в провайдер аутентификации */}
//       <RouterProvider router={router} />
//     </AuthProvider>
//     //     <Routes>
//     //       <Route path='course-study/:course_id' element={<CourseStudy />} />

//     //       <Route path='/' element={<Layout />} >
//     //         <Route index element={<Home />} />
//     //         {/* <Route path='about' element={<About />} /> */}
//     //         {/* <Route path='student-login' element={<StudentLogin />} /> */}
//     //         {/* <Route path='student-register' element={<StudentRegister />} /> */}
//     //         {/* <Route path='detail/:course_id' element={<CourseDetail />} /> */}
//     //         {/* <Route path='course-study/:course_id' element={<CourseStudy />} /> */}
//     //         {/* <Route path='search/:searchString' element={<SearchByCourse />} /> */}
//     //         <Route path='all-courses' element={<AllCourses />} />
//     //         <Route path='category' element={<CategoryPage />} />
//     //         <Route path='logout' element={<UserLogout />} />


//     //         <Route path='popular-courses' element={<PopularCourses />} />
//     //         <Route path='popular-teachers' element={<PopularTeachers />} />
//     //         {/* <Route path='teacher-login' element={<TeacherLogin />} /> */}
//     //         {/* <Route path='teacher-register' element={<TeacherRegister/>} /> */}
//     //         <Route path='verify-teacher/:teacher_id' element={<VerifyOTPTeacher />} />
//     //         <Route path='teacher-detail/:teacher_id' element={<TeacherDetail />} />
//     //         <Route path='courses-by-cat/:category_id/:category_slug' element={<CoursesByCat />} />  
//     //         <Route path='courses-by-skills/:skill_slug/:teacher_id' element={<SkillCourses />} />  


//     //           <Route path='student-profile/' element={<UserDashmain />} >
//     //           <Route index element={<StudentDashboard />} />
//     //             <Route path='my-courses' element={<StudentMyCourses />} />
//     //             <Route path='favorite-courses' element={<StudentFavoriteCourses />} />
//     //             <Route path='recommend-courses' element={<StudentRecommendCourses />} />
//     //             <Route path='incoming-task' element={<StudentIncomingTask />} />
//     //             <Route path='profile-settings' element={<StudentProfileSettings />} />
//     //             <Route path='reset-password' element={<StudentChangePassword />} />
//     //             <Route path='dashboard' element={<StudentDashboard />} />
//     //             <Route path='study-materials/:course_id' element={<StudentStudyMaterials />} />
//     //           </Route>

//     //           <Route path='teacher-profile/' element={<TeacherDashmain />} >
//     //             <Route index element={<TeacherDashboard />} />
//     //             <Route path='my-courses' element={<MyTeacherCourses />} />
//     //             <Route path='all-chapters/:course_id' element={<Coursechapter />} />
//     //             <Route path='add-course' element={<AddCourse />} />
//     //             <Route path='study-materials/:course_id' element={<StudyMaterials />} />
//     //             {/* <Route path='edit-study-material/:study_id' element={<EditChapter />} /> */}
//     //             <Route path='add-study-material/:course_id' element={<AddStudyMaterial />} />
//     //             <Route path='teacher-quizes' element={<MyTeacherQuizes />} />
//     //             <Route path='add-quiz' element={<AddQuiz />} />
//     //             <Route path='edit-course/:course_id' element={<EditCourse />} />
//     //             <Route path='edit-quiz/:quiz_id' element={<EditQuiz />} />
//     //             <Route path='all-question/:quiz_id' element={<QuizQuestion />} />
//     //             <Route path='add-quiz-question/:quiz_id' element={<AddQuizQuestion />} />
//     //             <Route path='assign-quiz/:course_id' element={<AssignQuiz />} />

//     //             <Route path='add-chapter/:course_id' element={<AddChapter />} />
//     //             <Route path='edit-chapter/:chapter_id' element={<EditChapter />} />
//     //             <Route path='my-students' element={<MyStudents />} />

//     //             <Route path='dashboard' element={<TeacherDashboard />} />
//     //             <Route path='enrolled-students/:course_id' element={<EnrolledStudents/>} />
//     //             <Route path='add-tasks/:course_id' element={<AddTask/>} />
//     //             <Route path='view-tasks/:course_id' element={<ViewTask/>} />
//     //           </Route>


//     //         {/* <Route path='cardhouse/:id/' element={<CardhousePage />} /> */}
//     //       </Route>
//     // {/* редактирование курсов */}
//     //     <Route path='edit-course-full/' element={<MainComponent/>} >
//     //         <Route path='editor-info/:course_id' index element={<EditorPageInfo />} />
//     //         <Route path='add-chapter-full/:course_id' element={<AddChapter />} />
//     //         <Route path='add-module/:course_id/:chapter_id' element={<AddModule />} />
//     //         <Route path='edit-module/:course_id/:module_id' element={<EditModuleStage />} />
//     //         <Route path='edit-module/:course_id/:module_id/stage/:stage_id' element={<EditModuleStage />} />
//     //         <Route path='edit-module/:course_id/:module_id/stage/:stage_id/new' element={<AddStageLesson />} />
//     //       </Route>
//     //   {/* прохождение курсов  */}
//     //   <Route path='course-study/' element={<CourseStudy/>} >
//     //         <Route path='course/:course_id/:module_id/stage/:stage_id' index element={<StudentCourseLearn />} />
//     //       </Route>
//     //     </Routes>  
//   );
// }

// export default App;
