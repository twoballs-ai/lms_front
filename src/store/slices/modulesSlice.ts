// store/slices/modulesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Module {
    id: string;
    title: string;
    sort_index: number;
    description: string;
}

interface ModulesState {
    modules: Module[];
    activeModuleId: string | null;
}

const initialState: ModulesState = {
    modules: [],
    activeModuleId: null,
};

export const modulesSlice = createSlice({
    name: 'modules',
    initialState,
    reducers: {
        setActiveModuleId: (state, action: PayloadAction<string | null>) => {
            state.activeModuleId = action.payload;
        },
        addModule: (state, action: PayloadAction<Module>) => {
            state.modules.push(action.payload);
        },
        updateModule: (state, action: PayloadAction<Module>) => {
            const index = state.modules.findIndex(mod => mod.id === action.payload.id);
            if (index !== -1) {
                state.modules[index] = action.payload;
            }
        },
        deleteModule: (state, action: PayloadAction<string>) => {
            state.modules = state.modules.filter(module => module.id !== action.payload);
        },
    },
});

export const {
    setActiveModuleId,
    addModule,
    updateModule,
    deleteModule,
} = modulesSlice.actions;

export default modulesSlice.reducer;
