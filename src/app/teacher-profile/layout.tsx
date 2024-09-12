// app/teacher-profile/layout.tsx
import "./DashMain.scss";
import SideBar from "../../components/teacherProfileComponents/SideBar"
import PrivateRoute from "@/context/PrivateRouter";


export default function TeacherProfileLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
      <PrivateRoute requiredRole="teacher_model">
        <div className="container__teacher-dashboard">
            <div className="dashboard-body">
                <aside className="dashboard-body__left-menu">
                    <SideBar />
                </aside>
                <section className="dashboard-body__content">
                    {children}
                </section>
            </div>
        </div>
        </PrivateRoute>
      </>
    );
  }