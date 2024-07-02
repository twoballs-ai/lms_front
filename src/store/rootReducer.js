import { combineReducers } from '@reduxjs/toolkit';
import courseChapterReducer from './slices/courseEditorChapterSlice';

// import chaptersReducer from './slices/chaptersSlice'; // Import your slices
// import modulesReducer from './slices/modulesSlice'; // Import your slices
const rootReducer = combineReducers({
    course: courseChapterReducer,
});

export default rootReducer;