import React, { lazy, Suspense, useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import PrivateRoute from './Commons/PrivateRouter/PrivateRoute.tsx';
import { AuthProvider } from './Commons/PrivateRouter/AuthProvider.tsx';
import Loader from './components/reUseComponents/Loader.tsx';
import License from './components/pages/License/License.tsx';
import NotFound from './components/reUseComponents/NotFound.tsx';
import ViewBlogs from './components/pages/Blog/ViewNews.tsx';
import BlogDetail from './components/pages/Blog/NewsDetail.tsx';


// Lazy load components
const Layout = lazy(() => import('./components/pages/basicComponents/layouts.tsx'));
const Home = lazy(() => import('./components/pages/Home/Home.tsx'));
const MainComponent = lazy(() => import('./components/pages/TeacherProfile/CourseEditor/components/MainComponent.tsx'));
const About = lazy(() => import('./components/pages/About/About.tsx'));
const CourseDetail = lazy(() => import('./components/pages/Course/CourseDetail.tsx'));
const StudentDashboard = lazy(() => import('./components/pages/StudentProfile/ControlPanel/StudentCourseProfile/Dashboard.tsx'));
const StudentMyCourses = lazy(() => import('./components/pages/StudentProfile/ControlPanel/StudentCourseProfile/MyCourses.tsx'));
const UserDashmain = lazy(() => import('./components/pages/StudentProfile/ControlPanel/components/DashMain.tsx'));
const TeacherDashboard = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/Dashboard.tsx'));
const MyTeacherCourses = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/MyTeacherCourses.tsx'));
const TeacherDashMain = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/components/DashMain.tsx'));
const AddCourse = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/AddCourse.tsx'));
const TeacherProfileSettings = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/ProfileSettings.tsx'));
const TeacherChangePassword = lazy(() => import('./components/pages/TeacherProfile/ControlPanel/TeacherCoursesProfile/ChangePassword.tsx'));
const EditorPageInfo = lazy(() => import('./components/pages/TeacherProfile/CourseEditor/FullCourseEdit/EditorPageInfo.tsx'));
const EditModuleStage = lazy(() => import('./components/pages/TeacherProfile/CourseEditor/FullCourseEdit/EditModuleStage.tsx'));
const CourseEditor = lazy(() => import('./components/pages/TeacherProfile/CourseEditor/components/LeftBar/CourseEditor.tsx'));
const UserLogout = lazy(() => import('./components/pages/Auth/Logout/Logout.tsx'));
const CategoryPage = lazy(() => import('./components/pages/CoursesByCat/CategoryPage.tsx'));
const Header = lazy(() => import('./components/pages/basicComponents/Header/Header.tsx'));
const StudentProfileSettings = lazy(() => import('./components/pages/StudentProfile/ControlPanel/StudentCourseProfile/StudentProfileSettings.tsx'));
const StudentChangePassword = lazy(() => import('./components/pages/StudentProfile/ControlPanel/StudentCourseProfile/StudentChangePassword.tsx'));
const CoursePassingMainComponent = lazy(() => import('./components/pages/StudentProfile/CourseLearning/components/MainComponent.tsx'));
const CoursePageInfo = lazy(() => import('./components/pages/StudentProfile/CourseLearning/FullCoursePassing/CoursePageInfo.tsx'));
const CourseLearning = lazy(() => import('./components/pages/StudentProfile/CourseLearning/components/LeftBar/CourseLearning.tsx'));
const SettingsOutlet = lazy(() => import('./components/pages/TeacherProfile/CourseSettings/SettingsOutlet.tsx'));
const SettingsCourseInfo = lazy(() => import('./components/pages/TeacherProfile/CourseSettings/CourseSettingsPages/SettingsCourseInfo.tsx'));
const EditCourse = lazy(() => import('./components/pages/TeacherProfile/CourseSettings/CourseSettingsPages/EditCourse.tsx'));

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
