
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Layout from './components/basicComponents/layouts';
import About from './components/pages/About/About';
import CourseDetail from './components/pages/Course/CourseDetail';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';

function App() {
  return (
    <Routes>
      <Route path='/' element= {<Layout />} >
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='user-login' element={<Login />} />
        <Route path='user-register' element={<Register />} />
        <Route path='detail/:course_id' element={<CourseDetail />} />
        {/* <Route path='cardhouse/:id/' element={<CardhousePage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
