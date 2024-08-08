import React, { useState } from "react";
import LmsButton from "../../../../../../reUseComponents/Button";
import TextInput from "../../../../../../reUseComponents/TextInput";
import CourseEditorService from "../../../../../../../services/course.editor.service";

function ModulePopupMenu({ moduleEditData, setModuleEditData, chapters, setGetChapters, handlePopupClose }) {
    const [inputTitleValue, setInputTitleValue] = useState(moduleEditData.title || '');
    const [inputDescrValue, setInputDescrValue] = useState(moduleEditData.description || '');

    const handleInputChange = (e) => setInputTitleValue(e.target.value);
    const handleInputDescrChange = (e) => setInputDescrValue(e.target.value);

    const UpdateModule = async () => {
        const dataParams = { title: inputTitleValue, description: inputDescrValue };
        const response = await CourseEditorService.editCoursePageUpdateModule(moduleEditData.id, dataParams);
        if (response.status === 200 || response.status === 201) {
            const updatedModule = response.data.data;
            const newData = chapters.map(chapter => {
                if (chapter.id === updatedModule.chapter_id) {
                    const updatedModules = chapter.modules.map(module =>
                        module.id === updatedModule.id ? updatedModule : module
                    );
                    return { ...chapter, modules: updatedModules };
                }
                return chapter;
            });
            setGetChapters(newData);
            setModuleEditData(updatedModule);
            handlePopupClose();  // Close the popup after updating
        }
    };

    const deleteModule = async () => {
        const deleteResponse = await CourseEditorService.editCoursePageDeleteModule(moduleEditData.id);
        if (deleteResponse.status === 200 || deleteResponse.status === 201) {
            const updatedChapters = chapters.map(chapter => {
                if (chapter.id === moduleEditData.chapter_id) {
                    const remainingModules = chapter.modules.filter(module => module.id !== moduleEditData.id);
                    const updatedModules = remainingModules.map((module, index) => ({
                        ...module,
                        sort_index: index + 1
                    }));
                    return { ...chapter, modules: updatedModules };
                }
                return chapter;
            });
            setGetChapters(updatedChapters);
            setModuleEditData({});
            handlePopupClose();  // Close the popup after deletion
        }
    };

    return (
        <>
            <div style={{ borderRadius: '10px', backgroundColor: '#e9e9e9', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <p>Название модуля:</p>
                <TextInput isTextArea={false} placeholder={"Напишите сюда название модуля"} value={inputTitleValue} onChange={handleInputChange} />
                <p>Описание модуля:</p>
                <TextInput type={'textarea'} placeholder={"Напишите сюда описание модуля"} value={inputDescrValue} onChange={handleInputDescrChange} />
                <LmsButton buttonText={"Обновить"} handleClick={UpdateModule} />
            </div>
            <div style={{ position: 'absolute', bottom: '20px', padding: '10px' }}>
                <LmsButton buttonText={"Удалить модуль"} handleClick={deleteModule} />
            </div>
        </>
    );
}

export default ModulePopupMenu;
