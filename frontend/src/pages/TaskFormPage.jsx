import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTitle,
  submitTaskForm,
  loadTask,
  resetForm,
  setStatus,
} from '../features/tasks/taskFormSlice';
import { statusEnum } from '../constants/statusEnum';

const TaskFormPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const { id, title, projectId, loading, status, success, error } = useSelector(
    (state) => state.taskForm
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectIdFromUrl = searchParams.get('projectId');

  useEffect(() => {
    dispatch(resetForm());
    if (params.taskId) {
      dispatch(loadTask(params.taskId));
    }
  }, [dispatch, params.taskId]);

  const snackThat = (message, severity) => {
    setSnackMessage(message);
    setOpenSnackbar(true);
    setSeverity(severity);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onCreateClickHandler = async (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(title)) {
      snackThat(
        'Le nom de la tâche est obligatoire et doit contenir uniquement des caractères alphanumériques et des espaces.',
        'error'
      );
      return;
    }

    try {
      await dispatch(
        submitTaskForm({
          id,
          title,
          status,
          projectId: projectId ?? projectIdFromUrl,
        })
      );

      snackThat('Tâche créée/modifiée avec succès !', 'success');

      setTimeout(() => {
        navigate(
          projectIdFromUrl
            ? `/projects/${projectIdFromUrl}` // mode create task
            : `/projects/${projectId}` // mode update task
        );
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la création de la tâche:', error);
      snackThat('Erreur lors de la création de la tâche : ' + error, 'error');
    }
  };

  return (
    <div>
      <h1>Création/modification d'une tâche</h1>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          required
          id="task-title"
          label="Nom de la tâche"
          value={title}
          focused={!!params.taskId}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          sx={{
            width: '400px',
            input: { color: 'white' },
            label: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
          }}
        />
        <FormControl
          variant="filled"
          sx={{ m: 1, minWidth: 120, backgroundColor: 'white' }}
        >
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            variant="filled"
            labelId="status-label"
            id="status-select"
            value={status}
            label="Status"
            onChange={(e) => dispatch(setStatus(e.target.value))}
          >
            {Object.values(statusEnum).map((statusValue) => (
              <MenuItem key={statusValue} value={statusValue}>
                {statusValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={onCreateClickHandler}
          disabled={loading}
        >
          Créer/Modifier
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
      >
        <Alert variant="filled" severity={severity}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TaskFormPage;
