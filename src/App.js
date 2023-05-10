
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Layout from './components/basicComponents/layouts';
import About from './components/pages/About/About';
import CourseDetail from './components/pages/Student/Course/CourseDetail';
import StudentLogin from './components/pages/Student/Login/Login';
import TeacherLogin from './components/pages/Teacher/Login/Login';
import StudentRegister from './components/pages/Student/Register/Register';
import TeacherRegister from './components/pages/Teacher/Register/Register';
import StudentDashboard from './components/pages/Student/ControlPanel/Dashboard';
import TeacherDashboard from './components/pages/Teacher/ControlPanel/Dashboard';
import StudentMyCourses from './components/pages/Student/ControlPanel/MyCourses';
import TeacherMyCourses from './components/pages/Teacher/ControlPanel/MyCourses';
import UserDashmain from './components/pages/Student/ControlPanel/components/DashMain';
import TeacherDashmain from './components/pages/Teacher/ControlPanel/components/DashMain';
import StudentFavoriteCourses from './components/pages/Student/ControlPanel/FavoriteCourse';
import AddCourse from './components/pages/Teacher/ControlPanel/AddCourse';
import StudentRecommendCourses from './components/pages/Student/ControlPanel/RecommendCourses';
import StudentProfileSettings from './components/pages/Student/ControlPanel/ProfileSettings';
import StudentChangePassword from './components/pages/Student/ControlPanel/ChangePassword';
import MyStudents from './components/pages/Teacher/ControlPanel/MyStudents';
import TeacherProfileSettings from './components/pages/Teacher/ControlPanel/ProfileSettings';
import TeacherChangePassword from './components/pages/Teacher/ControlPanel/ChangePassword';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='student-login' element={<StudentLogin />} />
        <Route path='student-register' element={<StudentRegister />} />
        
          <Route path='student-profile/' element={<UserDashmain />} >
          <Route index element={<StudentDashboard />} />

            <Route path='my-courses' element={<StudentMyCourses />} />
            <Route path='favorite-courses' element={<StudentFavoriteCourses />} />
            <Route path='recommend-courses' element={<StudentRecommendCourses />} />
            <Route path='profile-settings' element={<StudentProfileSettings />} />
            <Route path='reset-password' element={<StudentChangePassword />} />
            <Route path='dashboard' element={<StudentDashboard />} />
          </Route>

          
          <Route path='teacher-login' element={<TeacherLogin />} />
        <Route path='teacher-register' element={<TeacherRegister />} />

          <Route path='teacher-profile/' element={<TeacherDashmain />} >
          <Route index element={<TeacherDashboard />} />

            <Route path='my-courses' element={<TeacherMyCourses />} />
            <Route path='add-course' element={<AddCourse />} />
            <Route path='my-students' element={<MyStudents />} />
            <Route path='profile-settings' element={<TeacherProfileSettings />} />
            <Route path='reset-password' element={<TeacherChangePassword />} />
            <Route path='dashboard' element={<StudentDashboard />} />
          </Route>
    
        <Route path='detail/:course_id' element={<CourseDetail />} />
        {/* <Route path='cardhouse/:id/' element={<CardhousePage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
