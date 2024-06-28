import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Module {
  id: number;
  title: string;
  description: string;
  sort_index: number;
}

interface Chapter {
  id: number;
  title: string;
  description: string;
  sort_index: number;
  is_exam: boolean;
  exam_duration: number;
  modules: Module[];
}

interface ChaptersState {
  chapters: Chapter[];
  activeChapterId: string | null;
}

const initialState: ChaptersState = {
  chapters: [],
  activeChapterId: null,
};

export const fetchChapters = createAsyncThunk(
  'chapters/fetchChapters',
  async (courseId: string) => {
    const response = await CourseEditorService.getChapters(courseId);
    return response.data;
  }
);

export const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setActiveChapterId: (state, action) => {
      state.activeChapterId = action.payload;
    },
    addModule: (state, action) => {
      const chapter = state.chapters.find(chap => chap.id === action.payload.chapterId);
      if (chapter) {
        chapter.modules.push(action.payload.module);
      }
    },
    updateChapter: (state, action) => {
      const index = state.chapters.findIndex(chap => chap.id === action.payload.id);
      if (index !== -1) {
        state.chapters[index] = action.payload;
      }
    },
    deleteChapter: (state, action) => {
      state.chapters = state.chapters.filter(chapter => chapter.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChapters.fulfilled, (state, action) => {
      state.chapters = action.payload;
    });
  },
});

export const {
  setActiveChapterId,
  addModule,
  updateChapter,
  deleteChapter,
} = chaptersSlice.actions;

export default chaptersSlice.reducer;
