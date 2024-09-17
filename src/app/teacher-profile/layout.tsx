"use client"; // app/teacher-profile/layout.tsx
import "./DashMain.scss";
import SideBar from "../../components/teacherProfileComponents/SideBar"



export default function TeacherProfileLayout({ children }: { children: React.ReactNode }) {
    return (
      <>

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

      </>
    );
  }