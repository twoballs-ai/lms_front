// src/store/courseEditorSlice.ts
import CourseEditorService from '@/services/course.editor.service';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Chapter {
    id: number;
    title: string;
    description: string;
    sort_index: number;
    is_exam: boolean;
    exam_duration: number | null;
    modules: Module[];
}

interface Module {
    id: number;
    title: string;
    description: string;
    sort_index: number;
}

interface CourseEditorState {
    chapters: Chapter[];
    moduleEditData: Module | null;
    activeChapterId: number | null;
    activeModuleId: number | null;
    isModalOpen: boolean;
    inputTitleValue: string;
    inputDescrValue: string;
    sortIndex: number;
    isExam: boolean;
    examDuration: number;
}

const initialState: CourseEditorState = {
    chapters: [],
    moduleEditData: null,
    activeChapterId: null,
    activeModuleId: null,
    isModalOpen: false,
    inputTitleValue: '',
    inputDescrValue: '',
    sortIndex: 1,
    isExam: false,
    examDuration: 10,
};

export const fetchChapters = createAsyncThunk(
    'courseEditor/fetchChapters',
    async (course_id: string) => {
        const response = await CourseEditorService.editCoursePageGetChapterList(course_id);
        return response.data.data;
    }
);

export const addChapter = createAsyncThunk(
    'courseEditor/addChapter',
    async (dataParams: {
        course_id: string;
        title: string;
        description: string;
        sort_index: number;
        is_exam: boolean;
        exam_duration_minutes: number | null;
    }) => {
        const response = await CourseEditorService.editCoursePageAddChapter(dataParams);
        return response.data.data;
    }
);

const courseEditorSlice = createSlice({
    name: 'courseEditor',
    initialState,
    reducers: {
        setModuleEditData(state, action: PayloadAction<Module | null>) {
            state.moduleEditData = action.payload;
        },
        setActiveChapterId(state, action: PayloadAction<number | null>) {
            state.activeChapterId = action.payload;
        },
        setActiveModuleId(state, action: PayloadAction<number | null>) {
            state.activeModuleId = action.payload;
        },
        setModalOpen(state, action: PayloadAction<boolean>) {
            state.isModalOpen = action.payload;
        },
        setInputTitleValue(state, action: PayloadAction<string>) {
            state.inputTitleValue = action.payload;
        },
        setInputDescrValue(state, action: PayloadAction<string>) {
            state.inputDescrValue = action.payload;
        },
        setSortIndex(state, action: PayloadAction<number>) {
            state.sortIndex = action.payload;
        },
        setIsExam(state, action: PayloadAction<boolean>) {
            state.isExam = action.payload;
        },
        setExamDuration(state, action: PayloadAction<number>) {
            state.examDuration = action.payload;
        },
        setChapters(state, action: PayloadAction<Chapter[]>) {
            state.chapters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChapters.fulfilled, (state, action) => {
            state.chapters = action.payload;
            const maxSortIndex = Math.max(...state.chapters.map(chapter => chapter.sort_index));
            state.sortIndex = maxSortIndex + 1;
        });
        builder.addCase(addChapter.fulfilled, (state, action) => {
            state.chapters.push(action.payload);
            state.isModalOpen = false;
        });
    },
});

export const {
    setModuleEditData,
    setActiveChapterId,
    setActiveModuleId,
    setModalOpen,
    setInputTitleValue,
    setInputDescrValue,
    setSortIndex,
    setIsExam,
    setExamDuration,
    setChapters,
} = courseEditorSlice.actions;

export default courseEditorSlice.reducer;
