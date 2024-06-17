import React, { lazy, Suspense, useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import PrivateRoute from './Commons/PrivateRouter/PrivateRoute';
import { AuthProvider } from './Commons/PrivateRouter/AuthProvider';
import Loader from './components/reUseComponents/Loader';
import License from './components/pages/License/License';
import NotFound from './components/pages/NotFound/NotFound'; // Import NotFound component

// Lazy load components
const Layout = lazy(() => import('./components/pages/basicComponents/layouts'));
const Home = lazy(() => import('./components/pages/Home/Home'));
const MainComponent = lazy(() => import('./components/pages/TeacherProfile/CourseEditor/components/MainComponent'));
const About = lazy(() => import('./components/pages/About/About'));
const CourseDetail = lazy(() => import('./components/pages/Course/CourseDetail'));
const StudentDashboard = lazy(() => import('./components/pages/StudentProfile/ControlPanel/StudentCourseProfile/Dashboard'));
const StudentMyCourses = lazy(() => import('./components/pages/StudentProfile/ControlPanel/StudentCourseProfile/MyCourses'));
const UserDashmain = lazy(() => import('./components/pages/StudentProfile/ControlPanel/components/DashMain'));
const TeacherDashboard = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/Dashboard'));
const MyTeacherCourses = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/MyTeacherCourses'));
const TeacherDashMain = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/components/DashMain'));
const AddCourse = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/AddCourse'));
const TeacherProfileSettings = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/ProfileSettings'));
const TeacherChangePassword = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/ChangePassword'));
const EditorPageInfo = lazy(() => import('./components/pages/TeacherProfile/CourseEditor/FullCourseEdit/EditorPageInfo'));
const EditModuleStage = lazy(() => import('./components/pages/TeacherProfile/CourseEditor/FullCourseEdit/EditModuleStage'));
const CourseEditor = lazy(() => import('./components/pages/TeacherProfile/CourseEditor/components/LeftBar/CourseEditor'));
const UserLogout = lazy(() => import('./components/pages/Auth/Logout/Logout'));
const CategoryPage = lazy(() => import('./components/pages/CoursesByCat/CategoryPage'));
const Header = lazy(() => import('./components/pages/basicComponents/Header/Header'));
const StudentProfileSettings = lazy(() => import('./components/pages/StudentProfile/ControlPanel/StudentCourseProfile/StudentProfileSettings'));
const StudentChangePassword = lazy(() => import('./components/pages/StudentProfile/ControlPanel/StudentCourseProfile/StudentChangePassword'));
const CoursePassingMainComponent = lazy(() => import('./components/pages/StudentProfile/CourseLearning/components/MainComponent'));
const CoursePageInfo = lazy(() => import('./components/pages/StudentProfile/CourseLearning/FullCoursePassing/CoursePageInfo'));
const CourseLearning = lazy(() => import('./components/pages/StudentProfile/CourseLearning/components/LeftBar/CourseLearning'));
const SettingsOutlet = lazy(() => import('./components/pages/TeacherProfile/CourseSettings/SettingsOutlet'));
const SettingsCourseInfo = lazy(() => import('./components/pages/TeacherProfile/CourseSettings/CourseSettingsPages/SettingsCourseInfo'));
const EditCourse = lazy(() => import('./components/pages/TeacherProfile/CourseSettings/CourseSettingsPages/EditCourse'));

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
      { path: "license", element: <License /> },
      { path: "category", element: <CategoryPage /> },
      { path: "logout", element: <UserLogout /> },
    ]
  },
  {
    path: "student-profile",
    element: (
      <PrivateRoute requiredRole="student_model">
        <Header />
        <UserDashmain />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: "my-courses", element: <StudentMyCourses /> },
      { path: "profile-settings", element: <StudentProfileSettings /> },
      { path: "reset-password", element: <StudentChangePassword /> },
    ]
  },
  {
    path: "teacher-profile",
    element: (
      <PrivateRoute requiredRole="teacher_model">
        <Header />
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
    path: "course-editor/:course_id",
    element: (
      <PrivateRoute requiredRole="teacher_model">
        <Header />
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
        <Header />
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
        <Header />
        <CoursePassingMainComponent />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <CoursePageInfo /> },
      { path: "learning", element: <CourseLearning /> },
    ]
  },
  { path: '*', element: <NotFound /> }, // Route for handling 404 errors
]);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust as needed based on your actual loading time

    // Clean up if needed
    return () => {
      // Clean-up code here if necessary
    };
  }, []);

  return (
    <AuthProvider>
      {loading ? (
        <Loader /> // Show loader while app is loading
      ) : (
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      )}
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
      /> 
    </AuthProvider>
  );
};

export default App;
