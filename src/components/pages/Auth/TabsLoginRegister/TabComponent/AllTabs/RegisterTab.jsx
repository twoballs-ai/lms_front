import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import StudentRegister from "../../../RegisterComponents/StudentRegister/Register";
import TeacherRegister from "../../../RegisterComponents/TeacherRegister/Register";

// import "react-tabs/style/react-tabs.css";
const RegisterTab = () => {
    return (
        <div className="RegisterTab">
            <p>Создайте новую учетную запись</p>
            <Tabs className="TabsRegister">
                <TabList>
                    <Tab>Стать учащимся</Tab>
                    <Tab>Стать учителем</Tab>
                </TabList>
                <TabPanel>
                    <StudentRegister />
                </TabPanel>
                <TabPanel>
                    <TeacherRegister />
                </TabPanel>
            </Tabs>
        </div>
    );
};
export default RegisterTab;
