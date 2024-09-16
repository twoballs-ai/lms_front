import React, { useState } from "react";
import * as Yup from "yup";
import AuthService from "../../../../services/auth.service";
import TextInput from "../../../reUseComponents/TextInput";
import "./Register.scss";

const RegisterForm = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Некорректный email, пожалуйста добавьте корректный").required("Обязательно"),
    password: Yup.string().min(8, "Пароль должен содержать минимум 8 символов").required("Обязательно"),
  });

  const validateForm = async () => {
    try {
      await validationSchema.validate({
        email,
        password,
      }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    if (userType === "student") {
      formData.append("interested_categories", "");
      await AuthService.studentRegister(formData).then((response) => {
        if (response.status === 200 || response.status === 201) {
          setEmail("");
          setPassword("");
          console.log(response);
        }
      }).catch((error) => {
        setErrorMsg(error.response.data.message);
      });
    } else if (userType === "teacher") {
      formData.append("qualification", "");
      formData.append("name", "");
      formData.append("lastName", "");
      formData.append("skills", "");
      await AuthService.teacherRegister(formData).then((response) => {
        if (response.status === 200 || response.status === 201) {
          setEmail("");
          setPassword("");
          console.log(response);
        }
      }).catch((error) => {
        setErrorMsg(error.response.data.message);
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
          style={errors.email ? { borderColor: 'red' } : {}}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <TextInput
          type={"password"}
          placeholder={"Введите пароль"}
          value={password}
          onChange={handlePasswordChange}
          style={errors.password ? { borderColor: 'red' } : {}}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div className="register-container__button-confirm">
        <button className="orange-button" onClick={handleSubmit}>Регистрация</button>
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
      {errorMsg && <div className="error">{errorMsg}</div>}
    </div>
  );
};

export default RegisterForm;
