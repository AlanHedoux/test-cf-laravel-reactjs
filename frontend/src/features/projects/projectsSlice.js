import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/projectsApi';

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

const initialState = {
  data: [],
  meta: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 5,
  },
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
      console.log('updateProject ', action.payload);
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
        state.error = action.payload || 'Erreur inconnue';
      });
  },
});

// création automatique des Action Creator grâce à redux toolkit
export const { addProject, updateProject, deleteProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
