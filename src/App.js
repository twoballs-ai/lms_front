
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Layout from './components/basicComponents/layouts';
import About from './components/pages/About/About';
import CourseDetail from './components/pages/Course/CourseDetail';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Dashboard from './components/pages/ControlPanel/Dashboard';
import MyCourses from './components/pages/ControlPanel/MyCourses';
import DashMain from './components/pages/ControlPanel/components/DashMain';
import FavoriteCourses from './components/pages/ControlPanel/FavoriteCourse';
import RecommendCourses from './components/pages/ControlPanel/RecommendCourses';
import ProfileSettings from './components/pages/ControlPanel/ProfileSettings';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='user-login' element={<Login />} />
        <Route path='user-register' element={<Register />} />
        
          <Route path='profile/' element={<DashMain />} >
          <Route index element={<Dashboard />} />

            <Route path='my-courses' element={<MyCourses />} />
            <Route path='favorite-courses' element={<FavoriteCourses />} />
            <Route path='recommend-courses' element={<RecommendCourses />} />
            <Route path='profile-settings' element={<ProfileSettings />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
    
        <Route path='detail/:course_id' element={<CourseDetail />} />
        {/* <Route path='cardhouse/:id/' element={<CardhousePage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
