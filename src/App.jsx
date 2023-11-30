
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
// import StudentLogin from './components/pages/Student/Login/Login';

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
// import TeacherLogin from './components/pages/Teacher/Login/Login';

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
import EnrolledStudents from './components/pages/Teacher/ControlPanel/EnrolledStudents';
import AddTask from './components/pages/Teacher/ControlPanel/AddTask';
import ViewTask from './components/pages/Teacher/ControlPanel/ViewTask';
import MyTeacherQuizes from './components/pages/Teacher/ControlPanel/TeacherQuizes';
import EditQuiz from './components/pages/Teacher/ControlPanel/EditQuiz';
import QuizQuestion from './components/pages/Teacher/ControlPanel/QuizQuestion';
import AddQuizQuestion from './components/pages/Teacher/ControlPanel/AddQuizQuestion';
import AssignQuiz from './components/pages/Teacher/ControlPanel/AssignQuizToCourse';
import SearchByCourse from './components/pages/Search/Search';
import StudyMaterials from './components/pages/Teacher/ControlPanel/StudyMaterials';
import AddStudyMaterial from './components/pages/Teacher/ControlPanel/AddStudyMaterial';
import StudentStudyMaterials from './components/pages/Student/ControlPanel/StudyMaterials';
import CategoryPage from './components/pages/CoursesByCat/CategoryPage';
import VerifyOTPTeacher from './components/pages/Teacher/ControlPanel/VerifyTeacher';
import CourseStudy from './components/pages/Course/CourseStudy';
import EditorPageInfo from './components/pages/Teacher/CourseEditor/FullCourseEdit/EditorPageInfo';
import AddModule from './components/pages/Teacher/CourseEditor/FullCourseEdit/AddModule';
// import EditModule from './components/pages/Teacher/FullCourseEdit/EditModule';
import EditModuleStage from './components/pages/Teacher/CourseEditor/FullCourseEdit/EditModuleStage';
import AddStageLesson from './components/pages/Teacher/CourseEditor/FullCourseEdit/AddStageLesson';
import StudentCourseLearn from './components/pages/Course/StudentCourseLearn';
import UserLogout from './components/Auth/Logout/Logout';
import MainComponent from './components/pages/Teacher/CourseEditor/components/MainComponent';
// import StudentRegister from './components/Auth/TabComponent/RegisterComponents/StudentRegister/Register';
// import TeacherRegister from './components/Auth/TabComponent/RegisterComponents/TeacherRegister/Register';

function App() {
  return (
    <Routes>
      {/* <Route path='course-study/:course_id' element={<CourseStudy />} /> */}
      
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        {/* <Route path='student-login' element={<StudentLogin />} /> */}
        {/* <Route path='student-register' element={<StudentRegister />} /> */}
        <Route path='detail/:course_id' element={<CourseDetail />} />
        {/* <Route path='course-study/:course_id' element={<CourseStudy />} /> */}
        <Route path='search/:searchString' element={<SearchByCourse />} />
        <Route path='all-courses' element={<AllCourses />} />
        <Route path='category' element={<CategoryPage />} />
        <Route path='logout' element={<UserLogout />} />
       
        
        <Route path='popular-courses' element={<PopularCourses />} />
        <Route path='popular-teachers' element={<PopularTeachers />} />
        {/* <Route path='teacher-login' element={<TeacherLogin />} /> */}
        {/* <Route path='teacher-register' element={<TeacherRegister/>} /> */}
        <Route path='verify-teacher/:teacher_id' element={<VerifyOTPTeacher />} />
        <Route path='teacher-detail/:teacher_id' element={<TeacherDetail />} />
        <Route path='courses-by-cat/:category_id/:category_slug' element={<CoursesByCat />} />  
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
            <Route path='study-materials/:course_id' element={<StudentStudyMaterials />} />
          </Route>
          
          <Route path='teacher-profile/' element={<TeacherDashmain />} >
            <Route index element={<TeacherDashboard />} />
            <Route path='my-courses' element={<MyTeacherCourses />} />
            <Route path='all-chapters/:course_id' element={<Coursechapter />} />
            <Route path='add-course' element={<AddCourse />} />
            <Route path='study-materials/:course_id' element={<StudyMaterials />} />
            {/* <Route path='edit-study-material/:study_id' element={<EditChapter />} /> */}
            <Route path='add-study-material/:course_id' element={<AddStudyMaterial />} />

            
            <Route path='teacher-quizes' element={<MyTeacherQuizes />} />
            <Route path='add-quiz' element={<AddQuiz />} />
            <Route path='edit-course/:course_id' element={<EditCourse />} />
            <Route path='edit-quiz/:quiz_id' element={<EditQuiz />} />
            <Route path='all-question/:quiz_id' element={<QuizQuestion />} />
            <Route path='add-quiz-question/:quiz_id' element={<AddQuizQuestion />} />
            <Route path='assign-quiz/:course_id' element={<AssignQuiz />} />

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
{/* редактирование курсов */}
    <Route path='edit-course-full/' element={<MainComponent/>} >
        <Route path='editor-info/:course_id' index element={<EditorPageInfo />} />
        <Route path='add-chapter-full/:course_id' element={<AddChapter />} />
        <Route path='add-module/:course_id/:chapter_id' element={<AddModule />} />
        <Route path='edit-module/:course_id/:module_id' element={<EditModuleStage />} />
        <Route path='edit-module/:course_id/:module_id/stage/:stage_id' element={<EditModuleStage />} />
        <Route path='edit-module/:course_id/:module_id/stage/:stage_id/new' element={<AddStageLesson />} />
      </Route>
  {/* прохождение курсов  */}
  <Route path='course-study/' element={<CourseStudy/>} >
        <Route path='course/:course_id/:module_id/stage/:stage_id' index element={<StudentCourseLearn />} />
      </Route>
    </Routes>  
  );
}

export default App;
