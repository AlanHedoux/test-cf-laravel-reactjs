import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiForm from '../../api/taskFormApi'; // pour create / update
import * as api from '../../api/tasksApi'; // pour getById
import { statusEnum } from '../../constants/statusEnum';

// thunk pour soumettre une tâche (création ou modification)
export const submitTaskForm = createAsyncThunk(
  'taskForm/submitTaskForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiForm.submitTask(formData);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || 'Erreur lors de la soumission du formulaire'
      );
    }
  }
);

// Thunk pour charger une tâche existante
export const loadTask = createAsyncThunk(
  'taskForm/loadTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const data = await api.getTaskById(taskId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Erreur lors du chargement de la tâche'
      );
    }
  }
);

const initialState = {
  id: null,
  title: '',
  status: statusEnum.PENDING,
  projectId: null,
  loading: false,
  success: false,
  error: null,
};

const taskFormSlice = createSlice({
  name: 'taskForm',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setTask: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.projectId = action.payload.project_id;
    },
    resetForm: (state) => {
      state.id = null;
      state.title = '';
      state.status = statusEnum.PENDING;
      state.projectId = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // submit
      .addCase(submitTaskForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitTaskForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.id = action.payload.id;
        state.title = action.payload.title;
        state.projectId = action.payload.project_id;
        state.status = action.payload.status;
      })
      .addCase(submitTaskForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      // load
      .addCase(loadTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTask.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.title = action.payload.title;
        state.status = action.payload.status;
        state.projectId = action.payload.project_id;
      })
      .addCase(loadTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTitle, setStatus, setTask, resetForm } =
  taskFormSlice.actions;
export default taskFormSlice.reducer;
