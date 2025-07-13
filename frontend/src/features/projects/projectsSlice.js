import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/projectsApi';
import * as tasksApi from '../../api/tasksApi';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (page = 1, { rejectWithValue }) => {
    // This will automatically dispatch a `pending` action first,
    // and then `fulfilled` or `rejected` actions based on the promise.

    try {
      const response = await api.getAllProjects(page);
      return response;
    } catch (error) {
      rejectWithValue('Thunk Error fetching projects:', error);
    }
  }
);

// Thunk pour charger un projet par ID
export const fetchProjectById = createAsyncThunk(
  'projects/fetchById',
  async (projectId) => {
    const response = await api.getProjectById(projectId);
    return response;
  }
);

// thunk pour supprimer une tache
export const deleteTask = createAsyncThunk(
  'projects/deleteTask',
  async ({ projectId, taskId }, { rejectWithValue }) => {
    try {
      await tasksApi.deleteTask(taskId);
      return { projectId, taskId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Erreur suppression tâche'
      );
    }
  }
);

const initialState = {
  data: [],
  meta: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 5,
  },
  current: null,
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialState,
  reducers: {
    // ajoute un projet dans la liste
    addProject(state, action) {
      state.data.push(action.payload);
    },
    // Mettre à jour un projet dans la liste
    updateProject(state, action) {
      const index = state.data.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    // Supprimer un projet
    deleteProject(state, action) {
      state.data = state.data.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder // cas gérés grâce à createAsyncThunk ( pending/fulfilled/rejected )
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur inconnue (fetchProjects)';
      })
      .addCase(fetchProjectById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.current = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        console.error(action.error);
        state.loading = false;
        state.error = action.payload || 'Erreur inconnue (fetchProjectById)';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { taskId } = action.payload;
        const project = state.current;
        if (project && project.tasks) {
          project.tasks = project.tasks.filter(
            (task) => task.id !== parseInt(taskId)
          );
        }
      });
  },
});

// création automatique des Action Creator grâce à redux toolkit
export const { addProject, updateProject, deleteProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
