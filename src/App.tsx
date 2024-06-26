import React, { lazy, Suspense, useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import PrivateRoute from './Commons/PrivateRouter/PrivateRoute.jsx';
import { AuthProvider } from './Commons/PrivateRouter/AuthProvider.jsx';
import Loader from './components/reUseComponents/Loader.jsx';
import License from './components/pages/License/License.jsx';
import NotFound from './components/reUseComponents/NotFound.jsx';
import ViewBlogs from './components/pages/Blog/ViewNews.jsx';
import BlogDetail from './components/pages/Blog/NewsDetail.jsx';


// Lazy load components
const Layout = lazy(() => import('./components/pages/basicComponents/layouts.jsx'));
const Home = lazy(() => import('./components/pages/Home/Home.jsx'));
const MainComponent = lazy(() => import('./components/pages/TeacherProfile/CourseEditor/components/MainComponent.jsx'));
const About = lazy(() => import('./components/pages/About/About.jsx'));
const CourseDetail = lazy(() => import('./components/pages/Course/CourseDetail.jsx'));
const StudentDashboard = lazy(() => import('./components/pages/StudentProfile/ControlPanel/StudentCourseProfile/Dashboard.jsx'));
const StudentMyCourses = lazy(() => import('./components/pages/StudentProfile/ControlPanel/StudentCourseProfile/MyCourses.jsx'));
const UserDashmain = lazy(() => import('./components/pages/StudentProfile/ControlPanel/components/DashMain.jsx'));
const TeacherDashboard = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/Dashboard.jsx'));
const MyTeacherCourses = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/MyTeacherCourses.jsx'));
const TeacherDashMain = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/components/DashMain.jsx'));
const AddCourse = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/AddCourse.jsx'));
const TeacherProfileSettings = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/ProfileSettings.jsx'));
const TeacherChangePassword = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/ChangePassword.jsx'));
const EditorPageInfo = lazy(() => import('./components/pages/TeacherProfile/CourseEditor/FullCourseEdit/EditorPageInfo.jsx'));
const EditModuleStage = lazy(() => import('./components/pages/TeacherProfile/CourseEditor/FullCourseEdit/EditModuleStage.jsx'));
const CourseEditor = lazy(() => import('./components/pages/TeacherProfile/CourseEditor/components/LeftBar/CourseEditor.jsx'));
const UserLogout = lazy(() => import('./components/pages/Auth/Logout/Logout.jsx'));
const CategoryPage = lazy(() => import('./components/pages/CoursesByCat/CategoryPage.jsx'));
const Header = lazy(() => import('./components/pages/basicComponents/Header/Header.jsx'));
const StudentProfileSettings = lazy(() => import('./components/pages/StudentProfile/ControlPanel/StudentCourseProfile/StudentProfileSettings.jsx'));
const StudentChangePassword = lazy(() => import('./components/pages/StudentProfile/ControlPanel/StudentCourseProfile/StudentChangePassword.jsx'));
const CoursePassingMainComponent = lazy(() => import('./components/pages/StudentProfile/CourseLearning/components/MainComponent.jsx'));
const CoursePageInfo = lazy(() => import('./components/pages/StudentProfile/CourseLearning/FullCoursePassing/CoursePageInfo.jsx'));
const CourseLearning = lazy(() => import('./components/pages/StudentProfile/CourseLearning/components/LeftBar/CourseLearning.jsx'));
const SettingsOutlet = lazy(() => import('./components/pages/TeacherProfile/CourseSettings/SettingsOutlet.jsx'));
const SettingsCourseInfo = lazy(() => import('./components/pages/TeacherProfile/CourseSettings/CourseSettingsPages/SettingsCourseInfo.jsx'));
const EditCourse = lazy(() => import('./components/pages/TeacherProfile/CourseSettings/CourseSettingsPages/EditCourse.jsx'));

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
      { path: "news-blog", element: <ViewBlogs /> },
      {
        path: "news-blog/:id",
        element: <BlogDetail />,
      },
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
