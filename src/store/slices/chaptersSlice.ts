// // src/redux/chaptersSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Module {
//   id: number;
//   title: string;
//   description: string;
//   sort_index: number;
// }

// interface Chapter {
//   id: number;
//   title: string;
//   description: string;
//   sort_index: number;
//   is_exam: boolean;
//   exam_duration: number;
//   modules: Module[];
// }

// interface ChaptersState {
//   chapters: Chapter[];
//   activeChapterId: number | null;
// }

// const initialState: ChaptersState = {
//   chapters: [],
//   activeChapterId: null,
// };

// const chaptersSlice = createSlice({
//   name: 'chapters',
//   initialState,
//   reducers: {
//     setChapters(state, action: PayloadAction<Chapter[]>) {
//       state.chapters = action.payload;
//     },
//     addModule(state, action: PayloadAction<{ chapterId: number, module: Module }>) {
//       const chapter = state.chapters.find(chap => chap.id === action.payload.chapterId);
//       if (chapter) {
//         chapter.modules.push(action.payload.module);
//       }
//     },
//     updateChapter(state, action: PayloadAction<Chapter>) {
//       const index = state.chapters.findIndex(chap => chap.id === action.payload.id);
//       if (index !== -1) {
//         state.chapters[index] = action.payload;
//       }
//     },
//     deleteChapter(state, action: PayloadAction<number>) {
//       state.chapters = state.chapters.filter(chap => chap.id !== action.payload);
//     },
//     setActiveChapterId(state, action: PayloadAction<number | null>) {
//       state.activeChapterId = action.payload;
//     },
//   },
// });

// export const { setChapters, addModule, updateChapter, deleteChapter, setActiveChapterId } = chaptersSlice.actions;
// export default chaptersSlice.reducer;
