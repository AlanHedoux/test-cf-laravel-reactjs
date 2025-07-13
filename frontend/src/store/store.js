import { configureStore } from '@reduxjs/toolkit';
import projectsSliceReducer from '../features/projects/projectsSlice';
import projectFormSliceReducer from '../features/projects/projectFormSlice';
import taskFormSliceReducer from '../features/tasks/taskFormSlice';

export const store = configureStore({
  reducer: {
    // Ajoutez ici vos reducers
    projects: projectsSliceReducer,
    projectForm: projectFormSliceReducer,
    taskForm: taskFormSliceReducer,
  },
});
