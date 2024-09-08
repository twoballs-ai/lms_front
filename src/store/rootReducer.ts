// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import courseEditorReducer from './slices/courseEditorChapterSlice';
// import chaptersReducer from './slices/chaptersSlice';
// import modulesReducer from './slices/modulesSlice';
const rootReducer = combineReducers({
    courseEditor: courseEditorReducer,
    // chapters: chaptersReducer,
    // modules: modulesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;