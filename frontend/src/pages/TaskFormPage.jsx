import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setName,
  submitTaskForm,
  loadTask,
  resetForm,
} from '../features/tasks/taskFormSlice';

const TaskFormPage = () => {
  const params = useParams(); // params.projectId et potentiellement params.taskId
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const { id, name, loading, success, error } = useSelector(
    (state) => state.taskForm
  );

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
    if (!regex.test(name)) {
      snackThat(
        'Le nom de la tâche est obligatoire et doit contenir uniquement des caractères alphanumériques et des espaces.',
        'error'
      );
      return;
    }

    try {
      const action = await dispatch(
        submitTaskForm({
          id,
          name,
          projectId: params.projectId,
        })
      );
      const createdOrUpdated = action.payload;

      snackThat('Tâche créée/modifiée avec succès !', 'success');

      setTimeout(() => {
        navigate(`/projects/${params.projectId}`); // ou rediriger vers la liste des tâches
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la création de la tâche:', error);
      snackThat('Erreur lors de la création de la tâche : ' + error, 'error');
    }
  };

  return (
    <div>
      {params.taskId ? (
        <h1>Modification d'une tâche</h1>
      ) : (
        <h1>Création d'une nouvelle tâche</h1>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          required
          id="task-name"
          label="Nom de la tâche"
          value={name}
          focused={!!params.taskId}
          onChange={(e) => dispatch(setName(e.target.value))}
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
        <Button
          variant="contained"
          onClick={onCreateClickHandler}
          disabled={loading}
        >
          {params.taskId ? 'Modifier' : 'Créer'}
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
