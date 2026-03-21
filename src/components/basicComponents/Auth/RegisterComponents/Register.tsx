"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import AuthService from "../../../../services/auth.service";
import TextInput from "../../../reUseComponents/TextInput";
import "./Register.scss";

const RegisterForm = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Некорректный email, пожалуйста добавьте корректный")
      .required("Обязательно"),
    password: Yup.string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .required("Обязательно"),
  });

  const validateForm = async () => {
    try {
      await validationSchema.validate(
        {
          email,
          password,
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

  const successText =
    userType === "student"
      ? "Регистрация ученика прошла успешно. Теперь вы можете войти в систему."
      : "Регистрация преподавателя прошла успешно. Теперь вы можете войти в систему.";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    const formData = new FormData();
    formData.append("email", email.trim());
    formData.append("password", password);

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (userType === "student") {
        formData.append("interested_categories", "");
        await AuthService.studentRegister(formData);
      } else if (userType === "teacher") {
        formData.append("qualification", "");
        formData.append("name", "");
        formData.append("lastName", "");
        formData.append("skills", "");
        await AuthService.teacherRegister(formData);
      }

      setEmail("");
      setPassword("");
      setSuccessMsg(successText);
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Не удалось завершить регистрацию.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-tab__register-container">
      <form className="register-card" onSubmit={handleSubmit}>
        <div className="register-card__header">
          <span className="auth-form__badge">
            {userType === "student" ? "Новый ученик" : "Новый преподаватель"}
          </span>
          <h3>
            {userType === "student"
              ? "Создайте аккаунт для обучения"
              : "Создайте аккаунт для публикации курсов"}
          </h3>
          <p>
            {userType === "student"
              ? "После регистрации вы сможете записываться на курсы и отслеживать прогресс."
              : "После регистрации вы сможете оформлять профиль преподавателя и запускать свои курсы."}
          </p>
        </div>

        <div className="register-container__log-pass-block">
          <div className="form-group">
            <label className="auth-form__label">Email</label>
            <TextInput
              type="email"
              placeholder="Введите ваш email"
              value={email}
              prefix={<MailOutlined />}
              onChange={handleEmailChange}
              style={errors.email ? { borderColor: "#ff6b6b" } : {}}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="auth-form__label">Пароль</label>
            <TextInput
              type="password"
              placeholder="Введите пароль"
              value={password}
              prefix={<LockOutlined />}
              onChange={handlePasswordChange}
              style={errors.password ? { borderColor: "#ff6b6b" } : {}}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
        </div>

        <div className="register-container__button-confirm">
          <button className="orange-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Создаем аккаунт..." : "Зарегистрироваться"}
          </button>
        </div>

        <div className="auth_reg_text">
          {userType === "student" ? (
            <span>
              Этот режим подойдет, если вы хотите проходить курсы на платформе и
              развивать свои навыки в удобном темпе.
            </span>
          ) : (
            <span>
              Этот режим подойдет, если вы хотите создавать курсы, делиться
              опытом и развивать собственную экспертную витрину.
            </span>
          )}
        </div>

        {successMsg && <div className="success-message">{successMsg}</div>}
        {errorMsg && <div className="error auth-form__server-error">{errorMsg}</div>}
      </form>
    </div>
  );
};

export default RegisterForm;
