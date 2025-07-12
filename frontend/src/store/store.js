import { configureStore } from '@reduxjs/toolkit';
import projectsSliceReducer from '../features/projects/projectsSlice';
import projectFormSliceReducer from '../features/projects/projectFormSlice';

export const store = configureStore({
  reducer: {
    // Ajoutez ici vos reducers
    projects: projectsSliceReducer,
    projectForm: projectFormSliceReducer,
  },
});
