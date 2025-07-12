import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addProject, updateProject } from './projectsSlice';
import * as apiForm from '../../api/projectFormApi';
import * as api from '../../api/projectsApi';

// thunk pour soumettre un nouveau projet
// ( ex. utilisation : dispatch(submitProjectForm({ name }));  )
export const submitProjectForm = createAsyncThunk(
  'projects/submitProjectForm',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiForm.submitProject(formData);

      //      dispatch(addProject(response.data));
      // @TODO implémenter updateProject en cas d'update
      console.log('data dans submitProjectForm', response.data);

      if (formData.id === null) {
        // si on est sur une création on veux maj l'id du state projectForm
        dispatch(setProject(response.data));
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || 'Erreur inconnue');
    }
  }
);

export const loadProject = createAsyncThunk(
  'projects/loadProject',
  async (id, { rejectWithValue }) => {
    try {
      console.log('api.getProjectById(id) : ', id);
      return await api.getProjectById(id);
    } catch (err) {
      return rejectWithValue(err.message || 'Erreur chargement projet');
    }
  }
);

const initialState = {
  id: null,
  name: '',
  loading: false,
  success: false,
  error: null,
};

const projectFormSlice = createSlice({
  name: 'projectForm',
  initialState: initialState,
  reducers: {
    // synchrone reducers
    setName: (state, action) => {
      state.name = action.payload;
    },
    setProject: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    resetForm: (state) => {
      state.name = '';
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  // async thunk here
  extraReducers: (builder) => {
    builder
      .addCase(submitProjectForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitProjectForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(submitProjectForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(loadProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProject.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.name = action.payload.name;
      })
      .addCase(loadProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setName, resetForm, setProject } = projectFormSlice.actions;
export default projectFormSlice.reducer;
