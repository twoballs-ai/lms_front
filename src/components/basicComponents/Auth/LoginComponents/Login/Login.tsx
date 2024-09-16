import React, { useState } from "react";
import * as Yup from "yup";
import AuthService from "../../../../../services/auth.service";
import TextInput from "../../../../reUseComponents/TextInput";
import "./Login.scss";

function AllProfilesLogin() {
  const [inputUsernameValue, setInputUsernameValue] = useState('');
  const [inputPasswordValue, setInputPasswordValue] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const validationSchema = Yup.object().shape({
    username: Yup.string().email("Некорректный email, пожалуйста добавьте корректный").required("Обязательно"),
    password: Yup.string().min(8, "Пароль должен содержать минимум 8 символов").required("Обязательно"),
  });

  const handleInputUsernameChange = (e) => {
    setInputUsernameValue(e.target.value);
  };

  const handleInputPasswordChange = (e) => {
    setInputPasswordValue(e.target.value);
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate({
        username: inputUsernameValue,
        password: inputPasswordValue,
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

  const submitForm = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    const formData = new FormData();
    formData.append('username', inputUsernameValue);
    formData.append('password', inputPasswordValue);

    await AuthService.login(formData).then((response) => {
      if (response.status === 200 || response.status === 201) {
        localStorage.clear();
        localStorage.setItem("access_token", JSON.stringify(response?.data?.access_token));
        localStorage.setItem("refresh_token", JSON.stringify(response?.data?.refresh_token));
        if (response?.data?.type === "teacher_model") {
          localStorage.setItem("role", JSON.stringify(response?.data?.type));
          window.location.href = "/teacher-profile/";
        }
        if (response?.data?.type === "student_model") {
          localStorage.setItem("role", JSON.stringify(response?.data?.type));
          localStorage.setItem("studentLoginStatus", JSON.stringify("true"));
          window.location.href = "/student-profile/";
        }
      }
    }).catch((error) => {
      setErrorMsg(error.response.data.message);
    });
  };

  return (
    <div className="login-tab__auth-container">
      <form onSubmit={submitForm} className="auth-container__log-pass-block">
        <div className="form-group">
          <TextInput
            type="text"
            placeholder="Введите ваш email"
            value={inputUsernameValue}
            onChange={handleInputUsernameChange}
            style={errors.username ? { borderColor: 'red' } : {}}
          />
          {errors.username && <div className="error">{errors.username}</div>}
        </div>
        <div className="form-group">
          <TextInput
            type="password"
            placeholder="Введите пароль"
            value={inputPasswordValue}
            onChange={handleInputPasswordChange}
            style={errors.password ? { borderColor: 'red' } : {}}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div className="auth-container__button-confirm">
          <button className="orange-button" type="submit">Войти</button>
        </div>
        {errorMsg && <div className="error">{errorMsg}</div>}
      </form>
    </div>
  );
}

export default AllProfilesLogin;
