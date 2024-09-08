import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { apiUrl } from '../../../../../shared/config';
import TextInput from '../../../../reUseComponents/TextInput';
import LmsButton from '../../../../reUseComponents/Button';
import './StudentChangePassword.scss';
import TeacherService from '../../../../../services/teacher.service';
import StudentService from '../../../../../services/student.service';

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Старый пароль обязателен'),
    newPassword: Yup.string()
        .required('Новый пароль обязателен')
        .min(8, 'Пароль должен быть не менее 8 символов')
});

function StudentChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errors, setErrors] = useState({});


    const handleSubmit = async (event) => {
       const data = { old_password: oldPassword, new_password: newPassword }
        try {
            StudentService.updateUserPass(data)
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                }
            })
        } catch (error) {
            if (error.inner) {
                const formErrors = error.inner.reduce((acc, currentError) => {
                    return { ...acc, [currentError.path]: currentError.message };
                }, {});
                setErrors(formErrors);
            } else {
                console.error("Error changing password:", error);
            }
        }
    };

    return (
        <div className="change-password__container">
            <h3>Смена пароля</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <TextInput
                        type="password"
                        placeholder="Старый пароль"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    {errors.oldPassword && <div className="error">{errors.oldPassword}</div>}
                </div>
                <div className="form-group">
                    <TextInput
                        type="password"
                        placeholder="Новый пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {errors.newPassword && <div className="error">{errors.newPassword}</div>}
                </div>
                <LmsButton buttonText={"Сменить пароль"} handleClick={handleSubmit} />
            </form>
        </div>
    );
}

export default StudentChangePassword;
