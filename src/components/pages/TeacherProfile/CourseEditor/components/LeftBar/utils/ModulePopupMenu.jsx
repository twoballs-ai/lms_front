import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TextInput from "../../../../../../reUseComponents/TextInput";
import LmsButton from "../../../../../../reUseComponents/Button";
import { updateModule, deleteModule } from "../../../../../../../store/slices/courseEditorChapterSlice";


function ModulePopupMenu({ moduleEditData, setModuleEditData, chapters, setGetChapters, handlePopupClose }) {
    const dispatch = useDispatch();
    const [inputTitleValue, setInputTitleValue] = useState(moduleEditData.title || '');
    const [inputDescrValue, setInputDescrValue] = useState(moduleEditData.description || '');

    const handleInputChange = (e) => setInputTitleValue(e.target.value);
    const handleInputDescrChange = (e) => setInputDescrValue(e.target.value);

    const handleUpdateModule = async () => {
        const dataParams = { module_id: moduleEditData.id, data: { title: inputTitleValue, description: inputDescrValue } };
        dispatch(updateModule(dataParams))
            .unwrap()
            .then((updatedModule) => {
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
            })
            .catch((error) => {
                console.error("Failed to update module:", error);
            });
    };

    const handleDeleteModule = async () => {
        dispatch(deleteModule(moduleEditData.id))
            .unwrap()
            .then(() => {
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
            })
            .catch((error) => {
                console.error("Failed to delete module:", error);
            });
    };

    return (
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
}

export default ModulePopupMenu;
