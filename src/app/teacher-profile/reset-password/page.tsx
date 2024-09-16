import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import * as Yup from 'yup';
import TextInput from '@/components/reUseComponents/TextInput';
import LmsButton from '@/components/reUseComponents/Button';
import './ChangePassword.scss';
import TeacherService from '@/services/teacher.service';

// Define interface for form errors
interface FormErrors {
    oldPassword?: string;
    newPassword?: string;
}

// Define interface for component state
interface ChangePasswordState {
    oldPassword: string;
    newPassword: string;
    errors: FormErrors;
}

// Validation schema with Yup
const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Старый пароль обязателен'),
    newPassword: Yup.string()
        .required('Новый пароль обязателен')
        .min(8, 'Пароль должен быть не менее 8 символов')
});

const ChangePassword: React.FC = () => {
    const [state, setState] = useState<ChangePasswordState>({
        oldPassword: '',
        newPassword: '',
        errors: {}
    });

    useEffect(() => {
        document.title = 'Профиль учителя - смена пароля - coursero.ru';
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validate form data
        try {
            await validationSchema.validate({
                oldPassword: state.oldPassword,
                newPassword: state.newPassword
            }, { abortEarly: false });

            const data = { old_password: state.oldPassword, new_password: state.newPassword };
            try {
                const response = await TeacherService.updateTeacherPass(data);
                if (response.status === 200 || response.status === 201) {
                    // Handle successful password change
                }
            } catch (error) {
                console.error("Error changing password:", error);
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const formErrors: FormErrors = error.inner.reduce((acc: FormErrors, currentError: Yup.ValidationError) => {
                    return { ...acc, [currentError.path!]: currentError.message };
                }, {});
                setState(prevState => ({ ...prevState, errors: formErrors }));
            } else {
                console.error("Error in validation:", error);
            }
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="change-password__container">
            <h3>Смена пароля</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <TextInput
                        name="oldPassword"
                        type="password"
                        placeholder="Старый пароль"
                        value={state.oldPassword}
                        onChange={handleInputChange}
                    />
                    {state.errors.oldPassword && <div className="error">{state.errors.oldPassword}</div>}
                </div>
                <div className="form-group">
                    <TextInput
                        name="newPassword"
                        type="password"
                        placeholder="Новый пароль"
                        value={state.newPassword}
                        onChange={handleInputChange}
                    />
                    {state.errors.newPassword && <div className="error">{state.errors.newPassword}</div>}
                </div>
                <LmsButton buttonText={"Сменить пароль"} handleClick={() => {}} />
            </form>
        </div>
    );
};

export default ChangePassword;
