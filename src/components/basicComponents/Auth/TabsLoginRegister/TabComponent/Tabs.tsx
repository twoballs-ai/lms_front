import React, { useState } from "react";
import LoginTab from "./AllTabs/LoginTab";
import RegisterTab from "./AllTabs/RegisterTab";

import "./Tabs.scss";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";

const TabsAuth = ({ authState }) => {
    const [activeTab, setActiveTab] = useState(authState);


    return (
        <div className="modal__tabs">

            <div className="tabs">
         
                {/* Tab nav */}
                <ul className="nav tabsNav">
                    {/* <li className={activeTab === "login" ? "active" : "" } onClick={handleTab1}>Вход</li>
        <li className={activeTab === "register" ? "active" : ""} onClick={handleTab2}>Регистрация</li> */}
                    <TabNavItem
                        title="Вход"
                        id="login"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <TabNavItem
                        title="Регистрация"
                        id="register"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </ul>
                <div className="outlet">
                    {/* content will be shown here */}
                    <TabContent id="login" activeTab={activeTab}>
                        <LoginTab />
                    </TabContent>
                    <TabContent id="register" activeTab={activeTab}>
                        <RegisterTab />
                    </TabContent>
                </div>
            </div>
        </div>

    );
};
export default TabsAuth;
