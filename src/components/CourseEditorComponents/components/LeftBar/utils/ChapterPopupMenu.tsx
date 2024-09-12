import React, { useState } from 'react';
import PopupMenu from "@/components/reUseComponents/PopupMenu";
import LmsButton from "@/components/reUseComponents/Button";
import TextInput from "@/components/reUseComponents/TextInput";
import ReusableSwitch from "@/components/reUseComponents/Switcher";
import ReusableSliderWithInput from "@/components/reUseComponents/Slider";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { deleteChapter, updateChapter, fetchChapters } from "@/store/slices/courseEditorChapterSlice";

const ChapterPopupMenu = ({
    chapter,
    handlePopupClose,
    handlePopupOpen,
}) => {
    const dispatch = useDispatch();
    const [isExam, setIsExam] = useState(chapter.is_exam || false);
    const [examDuration, setExamDuration] = useState(chapter.exam_duration || 10);
    const [inputTitleChapterValue, setInputTitleChapterValue] = useState(chapter.title || "");
    const [inputDescrChapterValue, setInputDescrChapterValue] = useState(chapter.description || "");
    const [errors, setErrors] = useState({});

    const schema = Yup.object().shape({
        inputTitleChapterValue: Yup.string()
            .max(100, "Название главы должно быть не длиннее 30 символов")
            .required("Введите название главы"),
        inputDescrChapterValue: Yup.string().required("Введите описание главы"),
    });

    const handleUpdateChapter = async () => {
        try {
            await schema.validate(
                {
                    inputTitleChapterValue,
                    inputDescrChapterValue,
                },
                { abortEarly: false }
            );

            const dataParams = {
                id: chapter.id,
                title: inputTitleChapterValue,
                description: inputDescrChapterValue,
                sort_index: chapter.sort_index,
                is_exam: isExam,
                exam_duration_minutes: isExam ? examDuration : null,
            };
            await dispatch(updateChapter(dataParams)).unwrap();
            handlePopupClose();
        } catch (validationErrors) {
            const validationErrorsObj = {};
            validationErrors.inner.forEach((error) => {
                validationErrorsObj[error.path] = error.message;
            });
            setErrors(validationErrorsObj);
        }
    };

    const handleDeleteChapter = async () => {
        try {
            await dispatch(deleteChapter(chapter.id)).unwrap();
            dispatch(fetchChapters(chapter.course_id)); // Re-fetch the chapters to update the state
            handlePopupClose();
        } catch (error) {
            console.error("Failed to delete chapter:", error);
        }
    };

    const popupContent = () => (
        <>
            <div
                style={{
                    borderRadius: "10px",
                    backgroundColor: "#e9e9e9",
                    padding: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <p>Название главы:</p>
                <TextInput
                    isTextArea={false}
                    placeholder={"Напишите сюда название главы"}
                    value={inputTitleChapterValue}
                    onChange={(e) => setInputTitleChapterValue(e.target.value)}
                />
                {errors.inputTitleChapterValue && (
                    <span className="error">{errors.inputTitleChapterValue}</span>
                )}
                <p>Описание главы:</p>
                <TextInput
                    type={"textarea"}
                    placeholder={"Напишите сюда описание главы"}
                    value={inputDescrChapterValue}
                    onChange={(e) => setInputDescrChapterValue(e.target.value)}
                />
                {errors.inputDescrChapterValue && (
                    <span className="error">{errors.inputDescrChapterValue}</span>
                )}
                <p>Является ли ваша глава экзаменом?</p>
                <ReusableSwitch
                    defaultChecked={isExam}
                    onChange={(checked) => setIsExam(checked)}
                />
                {isExam && (
                    <div>
                        <p>Продолжительность экзамена (в часах):</p>
                        <ReusableSliderWithInput
                            defaultValue={examDuration}
                            min={0}
                            max={48}
                            value={examDuration}
                            onChange={(value) => setExamDuration(value)}
                            style={{ marginBottom: "20px", width: "50%" }}
                            inputStyle={{ backgroundColor: "#f0f0f0" }}
                            sliderStyle={{ marginRight: "10px" }}
                        />
                    </div>
                )}
                <LmsButton
                    buttonText={"Обновить"}
                    handleClick={handleUpdateChapter}
                />
            </div>
            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    padding: "10px",
                }}
            >
                <LmsButton
                    buttonText={"Удалить раздел"}
                    handleClick={handleDeleteChapter}
                />
            </div>
        </>
    );

    return (
        <PopupMenu
            handlePopupOpen={handlePopupOpen}
            handlePopupClose={handlePopupClose}
            title={`Настройки раздела: ${chapter.title}`}
            popupContent={popupContent()}
        />
    );
};

export default ChapterPopupMenu;
