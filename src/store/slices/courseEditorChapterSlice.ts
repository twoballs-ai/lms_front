import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import CourseEditorService from '@/services/course.editor.service';

// Определение интерфейсов для данных
interface Module {
    id: string;
    title: string;
    sort_index: number;
}

interface Chapter {
    id: string;
    title: string;
    sort_index: number;
    modules: Module[];
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

// AsyncThunk для получения глав
export const fetchChapters = createAsyncThunk<Chapter[], string, { rejectValue: string }>(
    'courseEditor/fetchChapters',
    async (course_id, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.editCoursePageGetChapterList(course_id);
            if (response.status === 200 || response.status === 201) {
                const sortedChapters = response.data.data
                    .map((chapter: Chapter) => {
                        const sortedModules = chapter.modules.sort((a, b) => a.sort_index - b.sort_index);
                        return { ...chapter, modules: sortedModules };
                    })
                    .sort((a, b) => a.sort_index - b.sort_index);

                return sortedChapters;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// AsyncThunk для добавления главы
export const addChapter = createAsyncThunk<Chapter, Partial<Chapter>, { rejectValue: string }>(
    'courseEditor/addChapter',
    async (chapterData, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.addChapter(chapterData);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// AsyncThunk для удаления главы
export const deleteChapter = createAsyncThunk<string, string, { rejectValue: string }>(
    'courseEditor/deleteChapter',
    async (chapterId, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.deleteChapter(chapterId);
            if (response.status === 200 || response.status === 204) {
                return chapterId;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// AsyncThunk для обновления главы
export const updateChapter = createAsyncThunk<Chapter, Chapter, { rejectValue: string }>(
    'courseEditor/updateChapter',
    async (chapterData, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.updateChapter(chapterData);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// AsyncThunk для обновления индексов сортировки глав
export const updateChaptersSortIndexes = createAsyncThunk<Chapter[], Chapter[], { rejectValue: string }>(
    'courseEditor/updateChaptersSortIndexes',
    async (updatedChapters, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.updateChaptersSortIndexes(updatedChapters);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// AsyncThunk для добавления модуля к главе
export const addModuleToChapter = createAsyncThunk<Module, { chapter_id: string; module: Module }, { rejectValue: string }>(
    'courseEditor/addModuleToChapter',
    async ({ chapter_id, module }, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.addModuleToChapter(chapter_id, module);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// AsyncThunk для обновления индексов сортировки модулей
export const updateModulesSortIndexes = createAsyncThunk<{ chapter_id: string; modules: Module[] }, { chapter_id: string; modules: Module[] }, { rejectValue: string }>(
    'courseEditor/updateModulesSortIndexes',
    async ({ chapter_id, modules }, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.updateModulesSortIndexes(chapter_id, modules);
            if (response.status === 200 || response.status === 201) {
                return { chapter_id, modules: response.data };
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// AsyncThunk для обновления модуля
export const updateModule = createAsyncThunk<Module, Module, { rejectValue: string }>(
    'courseEditor/updateModule',
    async (module, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.updateModule(module);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// AsyncThunk для удаления модуля
export const deleteModule = createAsyncThunk<string, string, { rejectValue: string }>(
    'courseEditor/deleteModule',
    async (moduleId, { rejectWithValue }) => {
        try {
            const response = await CourseEditorService.deleteModule(moduleId);
            if (response.status === 200 || response.status === 204) {
                return moduleId;
            } else {
                return rejectWithValue(response.statusText);
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice с логикой
const courseEditorChapterSlice = createSlice({
    name: 'courseEditor',
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
                state.error = action.payload || 'Не удалось загрузить главы';
            })
            .addCase(addChapter.fulfilled, (state, action: PayloadAction<Chapter>) => {
                state.chapters.push(action.payload);
            })
            .addCase(addChapter.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'Не удалось добавить главу';
            })
            .addCase(deleteChapter.fulfilled, (state, action: PayloadAction<string>) => {
                state.chapters = state.chapters
                    .filter(chapter => chapter.id !== action.payload)
                    .map((chapter, index) => ({
                        ...chapter,
                        sort_index: index + 1,
                    }));
            })
            .addCase(deleteChapter.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'Не удалось удалить главу';
            })
            .addCase(updateChapter.fulfilled, (state, action: PayloadAction<Chapter>) => {
                state.chapters = state.chapters.map(chapter =>
                    chapter.id === action.payload.id ? action.payload : chapter
                );
            })
            .addCase(updateChapter.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'Не удалось обновить главу';
            })
            .addCase(updateChaptersSortIndexes.fulfilled, (state, action: PayloadAction<Chapter[]>) => {
                state.chapters = action.payload;
            })
            .addCase(updateChaptersSortIndexes.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'Не удалось обновить индексы сортировки глав';
            })
            .addCase(addModuleToChapter.fulfilled, (state, action: PayloadAction<Module>) => {
                state.chapters = state.chapters.map(chapter =>
                    chapter.id === action.payload.id
                        ? { ...chapter, modules: [...chapter.modules, action.payload] }
                        : chapter
                );
            })
            .addCase(addModuleToChapter.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'Не удалось добавить модуль';
            })
            .addCase(updateModulesSortIndexes.fulfilled, (state, action: PayloadAction<{ chapter_id: string, modules: Module[] }>) => {
                const { chapter_id, modules } = action.payload;
                const chapter = state.chapters.find(chapter => chapter.id === chapter_id);
                if (chapter) {
                    chapter.modules = modules;
                }
            })
            .addCase(updateModulesSortIndexes.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'Не удалось обновить индексы сортировки модулей';
            })
            .addCase(updateModule.fulfilled, (state, action: PayloadAction<Module>) => {
                state.chapters = state.chapters.map(chapter => ({
                    ...chapter,
                    modules: chapter.modules.map(module =>
                        module.id === action.payload.id ? action.payload : module
                    ),
                }));
            })
            .addCase(updateModule.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'Не удалось обновить модуль';
            })
            .addCase(deleteModule.fulfilled, (state, action: PayloadAction<string>) => {
                state.chapters = state.chapters.map(chapter => ({
                    ...chapter,
                    modules: chapter.modules.filter(module => module.id !== action.payload),
                }));
            })
            .addCase(deleteModule.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'Не удалось удалить модуль';
            });
    },
});

export default courseEditorChapterSlice.reducer;
