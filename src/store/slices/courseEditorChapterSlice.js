import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CourseEditorService from '../../services/course.editor.service';

export const fetchChapters = createAsyncThunk(
    'course/fetchChapters',
    async (course_id, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.editCoursePageGetChapterList(course_id);
            if (response.status === 200 || response.status === 201) {
                const sortedChapters = response.data.data.map(chapter => {
                    const sortedModules = chapter.modules.sort((a, b) => a.sort_index - b.sort_index);
                    return { ...chapter, modules: sortedModules };
                });
                return sortedChapters;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addChapter = createAsyncThunk(
    'course/addChapter',
    async ({ course_id, inputTitleValue, inputDescrValue, sortIndex, isExam, examDuration }, { rejectWithValue }) => {
        let examDurationValue = isExam ? examDuration : null;

        const dataParams = {
            course_id,
            title: inputTitleValue,
            description: inputDescrValue,
            sort_index: sortIndex,
            is_exam: isExam,
            exam_duration_minutes: examDurationValue
        };

        try {
            const response = await CourseEditorService.editCoursePageAddChapter(dataParams);
            if (response.status === 200 || response.status === 201) {
                return response.data.data;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteChapter = createAsyncThunk(
    'course/deleteChapter',
    async (chapter_id, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.editCoursePageDeleteChapter(chapter_id);
            if (response.status === 200 || response.status === 201) {
                return chapter_id;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateChapter = createAsyncThunk(
    'course/updateChapter',
    async (dataParams, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.editCoursePageUpdateChapter(dataParams.id, dataParams);
            if (response.status === 200 || response.status === 201) {
                return response.data.data;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addModuleToChapter = createAsyncThunk(
    'course/addModuleToChapter',
    async (dataParams, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.editCoursePageAddModule(dataParams);
            if (response.status === 200 || response.status === 201) {
                return response.data.data;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const courseEditorChapterSlice = createSlice({
    name: 'course',
    initialState: {
        chapters: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChapters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchChapters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.chapters = action.payload;
            })
            .addCase(fetchChapters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addChapter.fulfilled, (state, action) => {
                state.chapters.push(action.payload);
            })
            .addCase(addChapter.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteChapter.fulfilled, (state, action) => {
                state.chapters = state.chapters.filter(chapter => chapter.id !== action.payload);
            })
            .addCase(deleteChapter.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateChapter.fulfilled, (state, action) => {
                state.chapters = state.chapters.map(chapter =>
                    chapter.id === action.payload.id ? action.payload : chapter
                );
            })
            .addCase(updateChapter.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(addModuleToChapter.fulfilled, (state, action) => {
                state.chapters = state.chapters.map(chapter => 
                    chapter.id === action.payload.chapter_id 
                        ? { ...chapter, modules: [...chapter.modules, action.payload] }
                        : chapter
                );
            })
            .addCase(addModuleToChapter.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default courseEditorChapterSlice.reducer;
