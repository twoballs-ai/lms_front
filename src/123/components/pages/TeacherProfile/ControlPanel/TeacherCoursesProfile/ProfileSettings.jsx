import React, { useState, useEffect } from 'react';
import TextInput from '../../../../reUseComponents/TextInput';
import './ProfileSettings.scss'; // Import CSS file for styling
import LmsButton from '../../../../reUseComponents/Button';
import TeacherService from '../../../../../services/teacher.service';

function ProfileSettings() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [qualification, setQualification] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            await TeacherService.getTeacherProfile().then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setLastName(response.data.data.last_name);
                    setName(response.data.data.name);
                    setQualification(response.data.data.qualification);
                }
            });
        };
        fetchData();
    }, []);
    useEffect(() => {
        document.title = 'Профиль учителя - обновление данных профиля - coursero.ru';
      }, []);
    const handleSubmit = () => {
        const data = {
            name,
            last_name: lastName,
            qualification,
        };
        
        TeacherService.updateTeacherProfile(data)
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
          
                }
            })
            .catch((error) => {
                // Handle error, e.g., show an error message
                console.error("Error updating profile:", error);
            });
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleQualificationChange = (event) => {
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
}

export default ProfileSettings;
