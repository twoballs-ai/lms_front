import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import CourseEditorService from '../../services/course.editor.service';

// Определение типов для данных
interface Module {
    id: string;
    sort_index: number; // Изменено на number
    key: number;
}

interface Chapter {
    id: string;
    sort_index: number; // Изменено на number
    modules: Module[];
    key: number;
}

interface AddChapterParams {
    course_id: number;
    inputTitleValue: string;
    inputDescrValue: string;
    sortIndex: number;
    isExam: boolean;
    examDuration: number | null;
}

interface CourseState {
    chapters: Chapter[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Начальное состояние
const initialState: CourseState = {
    chapters: [],
    status: 'idle',
    error: null,
};

// Thunks
export const fetchChapters = createAsyncThunk<Chapter[], number, { rejectValue: string }>(
    'course/fetchChapters',
    async (course_id, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.editCoursePageGetChapterList(course_id);
            if (response.status === 200 || response.status === 201) {
                const sortedChapters = response.data.data
                    .map((chapter: Chapter) => {
                        const sortedModules = chapter.modules.sort((a, b) => a.sort_index - b.sort_index);
                        return { ...chapter, modules: sortedModules };
                    })
                    .sort((a:Chapter,b:Chapter) => a.sort_index - b.sort_index);
                    console.log(sortedChapters)
                return sortedChapters;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error) {
            // Обрабатываем возможные ошибки, если они не в формате {message: string}
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('Unknown error occurred');
            }
        }
    }
);

export const addChapter = createAsyncThunk<Chapter, AddChapterParams, { rejectValue: string }>(
    'course/addChapter',
    async ({ course_id, inputTitleValue, inputDescrValue, sortIndex, isExam, examDuration }, { rejectWithValue }) => {
        const examDurationValue = isExam ? examDuration : null;

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
            return rejectWithValue((error as { message: string }).message || 'Unknown error');
        }
    }
);

export const deleteChapter = createAsyncThunk<number, number, { rejectValue: string }>(
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
            return rejectWithValue((error as { message: string }).message || 'Unknown error');
        }
    }
);

export const updateChapter = createAsyncThunk<Chapter, Chapter, { rejectValue: string }>(
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
            return rejectWithValue((error as { message: string }).message || 'Unknown error');
        }
    }
);

export const updateChaptersSortIndexes = createAsyncThunk<Chapter[], { course_id: number; chapters: Chapter[] }, { rejectValue: string }>(
    'course/updateChaptersSortIndexes',
    async ({ course_id, chapters }, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.editCourseUpdateChapterSortIndexes(course_id, chapters);
            if (response.status === 200 || response.status === 201) {
                return response.data.data;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error) {
            return rejectWithValue((error as { message: string }).message || 'Unknown error');
        }
    }
);

export const addModuleToChapter = createAsyncThunk<Module, Module, { rejectValue: string }>(
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
            return rejectWithValue((error as { message: string }).message || 'Unknown error');
        }
    }
);

export const deleteModule = createAsyncThunk<number, number, { rejectValue: string }>(
    'course/deleteModule',
    async (module_id, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.editCoursePageDeleteModule(module_id);
            if (response.status === 200 || response.status === 201) {
                return module_id;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error) {
            return rejectWithValue((error as { message: string }).message || 'Unknown error');
        }
    }
);

export const updateModule = createAsyncThunk<Module, { module_id: number; data: UpdateModuleData }, { rejectValue: string }>(
    'course/updateModule',
    async ({ module_id, data }, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.editCoursePageUpdateModule(module_id, data);
            if (response.status === 200 || response.status === 201) {
                return response.data.data;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error) {
            return rejectWithValue((error as { message: string }).message || 'Unknown error');
        }
    }
);

export const updateModulesSortIndexes = createAsyncThunk<{ chapter_id: number; modules: Module[] }, { chapter_id: number; modules: Module[] }, { rejectValue: string }>(
    'course/updateModulesSortIndexes',
    async ({ chapter_id, modules }, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.editCourseUpdateModuleSortIndexes(chapter_id, modules);
            if (response.status === 200 || response.status === 201) {
                return response.data.data;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error) {
            return rejectWithValue((error as { message: string }).message || 'Unknown error');
        }
    }
);

// Слайс
const courseEditorChapterSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChapters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchChapters.fulfilled, (state, action: PayloadAction<Chapter[]>) => {
                state.status = 'succeeded';
                state.chapters = action.payload;
            })
            .addCase(fetchChapters.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || null;
            })
            .addCase(addChapter.fulfilled, (state, action: PayloadAction<Chapter>) => {
                state.chapters.push(action.payload);
            })
            .addCase(addChapter.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || null;
            })
            .addCase(deleteChapter.fulfilled, (state, action: PayloadAction<number>) => {
                state.chapters = state.chapters
                    .filter(chapter => chapter.id !== action.payload)
                    .map((chapter, index) => ({
                        ...chapter,
                        sort_index: index + 1,
                    }));
            })
            .addCase(deleteChapter.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || null;
            })
            .addCase(updateChapter.fulfilled, (state, action: PayloadAction<Chapter>) => {
                state.chapters = state.chapters.map(chapter =>
                    chapter.id === action.payload.id ? action.payload : chapter
                );
            })
            .addCase(updateChapter.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || null;
            })
            .addCase(updateChaptersSortIndexes.fulfilled, (state, action: PayloadAction<Chapter[]>) => {
                state.chapters = action.payload;
            })
            .addCase(updateChaptersSortIndexes.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || null;
            })
            .addCase(addModuleToChapter.fulfilled, (state, action: PayloadAction<Module>) => {
                state.chapters = state.chapters.map(chapter => 
                    chapter.id === action.payload.chapter_id 
                        ? { ...chapter, modules: [...chapter.modules, action.payload] }
                        : chapter
                );
            })
            .addCase(deleteModule.fulfilled, (state, action: PayloadAction<number>) => {
                state.chapters = state.chapters.map(chapter => ({
                    ...chapter,
                    modules: chapter.modules.filter(module => module.id !== action.payload),
                }));
            })
            .addCase(updateModule.fulfilled, (state, action: PayloadAction<Module>) => {
                state.chapters = state.chapters.map(chapter =>
                    chapter.id === action.payload.chapter_id
                        ? {
                              ...chapter,
                              modules: chapter.modules.map(module =>
                                  module.id === action.payload.id
                                      ? action.payload
                                      : module
                              ),
                          }
                        : chapter
                );
            })
            .addCase(updateModule.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || null;
            })
            .addCase(updateModulesSortIndexes.fulfilled, (state, action: PayloadAction<{ chapter_id: number; modules: Module[] }>) => {
                state.chapters = state.chapters.map(chapter =>
                    chapter.id === action.payload.chapter_id
                        ? {
                              ...chapter,
                              modules: action.payload.modules,
                          }
                        : chapter
                );
            })
            .addCase(updateModulesSortIndexes.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || null;
            });
    },
});

export default courseEditorChapterSlice.reducer;
