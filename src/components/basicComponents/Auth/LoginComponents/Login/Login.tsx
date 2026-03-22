"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import AuthService from "../../../../../services/auth.service";
import TextInput from "../../../../reUseComponents/TextInput";
import "./Login.scss";

function AllProfilesLogin() {
  const router = useRouter();
  const [inputUsernameValue, setInputUsernameValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Некорректный email, пожалуйста добавьте корректный")
      .required("Обязательно"),
    password: Yup.string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .required("Обязательно"),
  });

  const handleInputUsernameChange = (e) => {
    setInputUsernameValue(e.target.value);
    setErrorMsg("");
  };

  const handleInputPasswordChange = (e) => {
    setInputPasswordValue(e.target.value);
    setErrorMsg("");
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(
        {
          username: inputUsernameValue,
          password: inputPasswordValue,
        },
        { abortEarly: false }
      );
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

  // сохраняем токены + роли
  const persistAuthState = ({ access_token, refresh_token, types }) => {
    localStorage.setItem("access_token", JSON.stringify(access_token));
    localStorage.setItem("refresh_token", JSON.stringify(refresh_token));
    localStorage.setItem("roles", JSON.stringify(types || []));

    localStorage.setItem(
      "studentLoginStatus",
      JSON.stringify(types?.includes("student"))
    );

    window.dispatchEvent(new Event("auth:changed"));
  };

  // определяем куда редиректить
  const resolveProfileRoute = (types) => {
    if (!types) return null;

    // учитель имеет приоритет
    if (types.includes("teacher")) {
      return "/teacher-profile/dashboard";
    }

    if (types.includes("student")) {
      return "/student-profile/dashboard";
    }

    return null;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    const formData = new URLSearchParams();
    formData.append("username", inputUsernameValue.trim());
    formData.append("password", inputPasswordValue);

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await AuthService.login(formData);

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);

        const nextRoute = resolveProfileRoute(response?.data?.types);

        persistAuthState(response.data);

        if (nextRoute) {
          router.push(nextRoute);
          router.refresh();
          return;
        }

        setErrorMsg("Не удалось определить тип профиля для перехода.");
      }
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message || "Не удалось выполнить вход."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-tab__auth-container">
      <form onSubmit={submitForm} className="auth-container__log-pass-block">
        <div className="auth-form__header">
          <span className="auth-form__badge">Добро пожаловать</span>
          <h3>Войдите, чтобы продолжить обучение</h3>
          <p>
            Используйте email и пароль от вашей учетной записи, чтобы перейти в
            личный кабинет.
          </p>
        </div>

        <div className="form-group">
          <label className="auth-form__label">Email</label>
          <TextInput
            type="email"
            placeholder="Введите email"
            value={inputUsernameValue}
            prefix={<MailOutlined />}
            onChange={handleInputUsernameChange}
            error={errors.username}
          />
          {errors.username && <div className="error">{errors.username}</div>}
        </div>

        <div className="form-group">
          <label className="auth-form__label">Пароль</label>
          <TextInput
            type="password"
            placeholder="Введите пароль"
            value={inputPasswordValue}
            prefix={<LockOutlined />}
            onChange={handleInputPasswordChange}
            error={errors.password}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="auth-container__button-confirm">
          <button
            className="orange-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Входим..." : "Войти"}
          </button>
        </div>

        {errorMsg && (
          <div className="error auth-form__server-error">{errorMsg}</div>
        )}
      </form>
    </div>
  );
}

export default AllProfilesLogin;