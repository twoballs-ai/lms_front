import React, { useState, useEffect } from 'react';
import PopupMenu from "@/components/reUseComponents/PopupMenu";
import LmsButton from "@/components/reUseComponents/Button";
import TextInput from "@/components/reUseComponents/TextInput";

import { useDispatch } from 'react-redux';
import { deleteModule, fetchChapters, updateModule } from '@/store/slices/courseEditorChapterSlice';

const ModulePopupMenu = ({ course_id, moduleEditData, setModuleEditData, handlePopupOpen, handlePopupClose }) => {
    const [inputTitleValue, setInputTitleValue] = useState(moduleEditData.title || '');
    const [inputDescrValue, setInputDescrValue] = useState(moduleEditData.description || '');
    const dispatch = useDispatch();

    useEffect(() => {
        setInputTitleValue(moduleEditData.title);
        setInputDescrValue(moduleEditData.description);
    }, [moduleEditData]);

    const handleInputChange = (e) => setInputTitleValue(e.target.value);
    const handleInputDescrChange = (e) => setInputDescrValue(e.target.value);

    const handleUpdateModule = async () => {
        const dataParams = { module_id: moduleEditData.id, data: { title: inputTitleValue, description: inputDescrValue } };
        dispatch(updateModule(dataParams))
            .unwrap()
            .then((updatedModule) => {
                setModuleEditData(updatedModule);

            })
            .catch((error) => {
                console.error("Failed to update module:", error);
            });
    };

    const handleDeleteModule = async () => {
        dispatch(deleteModule(moduleEditData.id))
            .unwrap()
            .then(() => {
                console.log("start")
                dispatch(fetchChapters(course_id));
                console.log("stop")
                setModuleEditData({});
                handlePopupClose();  // Close the popup after deletion
            })
            .catch((error) => {
                console.error("Failed to delete module:", error);
            });
    };

    const popupContent = () => (
        <>
            <div style={{ borderRadius: '10px', backgroundColor: '#e9e9e9', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <p>Название модуля:</p>
                <TextInput isTextArea={false} placeholder={"Напишите сюда название модуля"} value={inputTitleValue} onChange={handleInputChange} />
                <p>Описание модуля:</p>
                <TextInput type={'textarea'} placeholder={"Напишите сюда описание модуля"} value={inputDescrValue} onChange={handleInputDescrChange} />
                <LmsButton buttonText={"Обновить"} handleClick={handleUpdateModule} />
            </div>
            <div style={{ position: 'absolute', bottom: '20px', padding: '10px' }}>
                <LmsButton buttonText={"Удалить модуль"} handleClick={handleDeleteModule} />
            </div>
        </>
    );

    return (
        <PopupMenu
            handlePopupOpen={handlePopupOpen}
            handlePopupClose={handlePopupClose}
            title={`Настройки модуля: ${moduleEditData.title}`}
            popupContent={popupContent()}
        />
    );
};

export default ModulePopupMenu;
