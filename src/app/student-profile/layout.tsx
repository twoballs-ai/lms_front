
import "./DashMain.scss";
import SideBar from "../../components/studentProfileComponents/SideBar"



export default function StudentProfileLayout({ children }: { children: React.ReactNode }) {
    return (
      <>

        <div className="container__dashboard">
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