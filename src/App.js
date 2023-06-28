
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Layout from './components/basicComponents/layouts';
import About from './components/pages/About/About';
import CourseDetail from './components/pages/Course/CourseDetail';
import TeacherDetail from './components/pages/Course/TeacherDetail';
import AllCourses from './components/pages/AllCourses/AllCourses';
import PopularCourses from './components/pages/PopularCourses/PopularCourses';
import PopularTeachers from './components/pages/PopularTeachers/PopularTeachers';
import CoursesByCat from './components/pages/CoursesByCat/CoursesByCat';
//student pages
import StudentLogin from './components/pages/Student/Login/Login';
import StudentRegister from './components/pages/Student/Register/Register';
import StudentDashboard from './components/pages/Student/ControlPanel/Dashboard';
import StudentMyCourses from './components/pages/Student/ControlPanel/MyCourses';
import UserDashmain from './components/pages/Student/ControlPanel/components/DashMain';
import StudentFavoriteCourses from './components/pages/Student/ControlPanel/FavoriteCourse';
import StudentRecommendCourses from './components/pages/Student/ControlPanel/RecommendCourses';
import StudentProfileSettings from './components/pages/Student/ControlPanel/StudentProfileSettings';
import StudentChangePassword from './components/pages/Student/ControlPanel/StudentChangePassword';
import StudentIncomingTask from './components/pages/Student/ControlPanel/StudentTask';

// quiz pages
import AddQuiz from './components/pages/Teacher/ControlPanel/AddQuiz';

//teacher pages
import TeacherLogout from './components/pages/Teacher/Logout/Logout';
import TeacherLogin from './components/pages/Teacher/Login/Login';
import TeacherRegister from './components/pages/Teacher/Register/Register';
import TeacherDashboard from './components/pages/Teacher/ControlPanel/Dashboard';
import MyTeacherCourses from './components/pages/Teacher/ControlPanel/MyTeacherCourses';
import TeacherDashmain from './components/pages/Teacher/ControlPanel/components/DashMain';
import AddCourse from './components/pages/Teacher/ControlPanel/AddCourse';
import AddChapter from './components/pages/Teacher/ControlPanel/AddChapter';
import EditChapter from './components/pages/Teacher/ControlPanel/EditChapter';
import MyStudents from './components/pages/Teacher/ControlPanel/MyStudents';
import TeacherProfileSettings from './components/pages/Teacher/ControlPanel/ProfileSettings';
import TeacherChangePassword from './components/pages/Teacher/ControlPanel/ChangePassword';
import Coursechapter from './components/pages/Teacher/ControlPanel/CourseChapters';
import EditCourse from './components/pages/Teacher/ControlPanel/EditCourse';
import SkillCourses from './components/pages/CoursesByCat/SkillCourses';
import StudentLogout from './components/pages/Student/Logout/Logout';
import EnrolledStudents from './components/pages/Teacher/ControlPanel/EnrolledStudents';
import AddTask from './components/pages/Teacher/ControlPanel/AddTask';
import ViewTask from './components/pages/Teacher/ControlPanel/ViewTask';
import MyTeacherQuizes from './components/pages/Teacher/ControlPanel/TeacherQuizes';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='student-login' element={<StudentLogin />} />
        <Route path='student-register' element={<StudentRegister />} />
        <Route path='student-logout' element={<StudentLogout/>} />
        <Route path='detail/:course_id' element={<CourseDetail />} />
        <Route path='all-courses' element={<AllCourses />} />
        
        <Route path='popular-courses' element={<PopularCourses />} />
        <Route path='popular-teachers' element={<PopularTeachers />} />
        <Route path='teacher-login' element={<TeacherLogin />} />
        <Route path='teacher-logout' element={<TeacherLogout />} />
        <Route path='teacher-register' element={<TeacherRegister />} />
        <Route path='teacher-detail/:teacher_id' element={<TeacherDetail />} />
        <Route path='courses-by-cat/:category_slug' element={<CoursesByCat />} />  
        <Route path='courses-by-skills/:skill_slug/:teacher_id' element={<SkillCourses />} />  
          
          <Route path='student-profile/' element={<UserDashmain />} >
          <Route index element={<StudentDashboard />} />
            <Route path='my-courses' element={<StudentMyCourses />} />
            <Route path='favorite-courses' element={<StudentFavoriteCourses />} />
            <Route path='recommend-courses' element={<StudentRecommendCourses />} />
            <Route path='incoming-task' element={<StudentIncomingTask />} />
            <Route path='profile-settings' element={<StudentProfileSettings />} />
            <Route path='reset-password' element={<StudentChangePassword />} />
            <Route path='dashboard' element={<StudentDashboard />} />
          </Route>
          
          <Route path='teacher-profile/' element={<TeacherDashmain />} >
          <Route index element={<TeacherDashboard />} />
            <Route path='my-courses' element={<MyTeacherCourses />} />
            <Route path='all-chapters/:course_id' element={<Coursechapter />} />
            <Route path='add-course' element={<AddCourse />} />
            <Route path='teacher-quizes' element={<MyTeacherQuizes />} />
            <Route path='add-quiz' element={<AddQuiz />} />
            <Route path='edit-course/:course_id' element={<EditCourse />} />
            <Route path='add-chapter/:course_id' element={<AddChapter />} />
            <Route path='edit-chapter/:chapter_id' element={<EditChapter />} />
            <Route path='my-students' element={<MyStudents />} />
            <Route path='profile-settings' element={<TeacherProfileSettings />} />
            <Route path='reset-password' element={<TeacherChangePassword />} />
            <Route path='dashboard' element={<TeacherDashboard />} />
            <Route path='enrolled-students/:course_id' element={<EnrolledStudents/>} />
            <Route path='add-tasks/:course_id' element={<AddTask/>} />
            <Route path='view-tasks/:course_id' element={<ViewTask/>} />
          </Route>
    
 
        {/* <Route path='cardhouse/:id/' element={<CardhousePage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
