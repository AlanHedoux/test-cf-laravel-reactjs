import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiForm from '../../api/taskFormApi'; // pour create / update
import * as api from '../../api/tasksApi'; // pour getById

// thunk pour soumettre une tâche (création ou modification)
export const submitTaskForm = createAsyncThunk(
  'tasks/submitTaskForm',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiForm.submitTask(formData);

      if (formData.id === null || formData.id === undefined) {
        dispatch(setTask(response.data));
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data ||
          "Erreur soumission du formulaire de création/modification d'une tache"
      );
    }
  }
);

// thunk pour charger une tâche existante
export const loadTask = createAsyncThunk(
  'tasks/loadTask',
  async (id, { rejectWithValue }) => {
    try {
      return await api.getTaskById(id);
    } catch (err) {
      return rejectWithValue(err.message || 'Erreur chargement tâche');
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

const taskFormSlice = createSlice({
  name: 'taskForm',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setTask: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    resetForm: (state) => {
      state.id = null;
      state.name = '';
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTaskForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitTaskForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(submitTaskForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(loadTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTask.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.name = action.payload.name;
      })
      .addCase(loadTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setName, resetForm, setTask } = taskFormSlice.actions;
export default taskFormSlice.reducer;
