// Add this directive at the top of the file
'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import TextInput from '@/components/reUseComponents/TextInput';
import './ProfileSettings.scss'; // Import CSS file for styling
import LmsButton from '@/components/reUseComponents/Button';
import TeacherService from '@/services/teacher.service';

interface TeacherProfile {
    name: string;
    last_name: string;
    qualification: string;
}

const ProfileSettings: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [qualification, setQualification] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TeacherService.getTeacherProfile();
                if (response.status === 200 || response.status === 201) {
                    const { name, last_name, qualification } = response.data.data;
                    setName(name);
                    setLastName(last_name);
                    setQualification(qualification);
                }
            } catch (error) {
                console.error("Error fetching teacher profile:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        document.title = 'Профиль учителя - обновление данных профиля - coursero.ru';
    }, []);

    const handleSubmit = async () => {
        const data: TeacherProfile = {
            name,
            last_name: lastName,
            qualification,
        };
        try {
            const response = await TeacherService.updateTeacherProfile(data);
            if (response.status === 200 || response.status === 201) {
                // Handle successful profile update
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleQualificationChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQualification(event.target.value);
    };

    return (
        <div className="profile-settings__container">
            <div className='container__title'>
                <h3>Изменение настроек профиля</h3>
            </div>
            <div className='container__form'>
                <div className="form_row">
                    <div className="col">
                        <TextInput
                            type="text"
                            placeholder="Имя"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="col">
                        <TextInput
                            type="text"
                            placeholder="Фамилия"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </div>
                </div>
                <div className="form_row">
                    <div className="col">
                        <TextInput
                            type="text"
                            placeholder="Квалификация"
                            value={qualification}
                            onChange={handleQualificationChange}
                        />
                    </div>
                </div>
                <LmsButton buttonText={"Обновить данные"} handleClick={handleSubmit} />
            </div>
        </div>
    );
};

export default ProfileSettings;
