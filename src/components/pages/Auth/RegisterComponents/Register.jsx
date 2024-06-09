import React, { useState } from "react";


import AuthService from "../../../../services/auth.service";
import TextInput from "../../../reUseComponents/TextInput";
import LmsButton from "../../../reUseComponents/Button";
import "./Register.scss"
const RegisterForm = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (userType === "student") {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("interested_categories", "");
        console.log(formData)
      await AuthService.studentRegister(formData).then((response) => {
        if (response.status === 200 || response.status === 201) {
          setEmail("");
          setPassword("");
          console.log(response);
        }
      });
    } else if (userType === "teacher") {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("qualification", "");
        formData.append("name", "");
        formData.append("lastName", "");
        formData.append("skills", "");
        console.log(formData)
      await AuthService.teacherRegister(formData).then((response) => {
        if (response.status === 200 || response.status === 201) {
          setEmail("");
          setPassword("");
          console.log(response);
        }
      });
    }
  };

  return (
    <div className="login-tab__register-container">
      <div className="register-container__log-pass-block">
        <TextInput
          type={"email"}
          placeholder={"Введите ваш email"}
          value={email}
          onChange={handleEmailChange}
        />
        <TextInput
          type={"password"}
          placeholder={"Введите пароль"}
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="register-container__button-confirm">
        <LmsButton buttonText={"Регистрация"} handleClick={handleSubmit} />
      </div>
      <div md={4} className="auth_reg_text">
        {userType === "student" ? (
          <span>
            Выберите этот вариант если вы хотите проходить курсы на нашей
            платформе, в последующем вы сможете расширить свою учетную запись
            для преподавания.
          </span>
        ) : (
          <span>
            Выберите этот вариант если вы хотите создавать курсы на нашей
            платформе. В будущем вы сможете на них зарабатывать.
          </span>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;