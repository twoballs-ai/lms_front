import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import RegisterForm from "../../../RegisterComponents/Register";


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
                    <RegisterForm userType="student" />
                </TabPanel>
                <TabPanel>
                    <RegisterForm userType="teacher" />
                </TabPanel>
            </Tabs>
        </div>
    );
};
export default RegisterTab;
