import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setName,
  submitProjectForm,
  loadProject,
  resetForm,
} from '../features/projects/projectFormSlice';

const ProjectFormPage = () => {
  const params = useParams(); // Utilisé pour récupérer l'ID du projet
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const { id, name, loading, success, error } = useSelector(
    (state) => state.projectForm
  );

  useEffect(() => {
    // Reset form on mount
    dispatch(resetForm());
    if (params.id) {
      // si l'id a muté on charge les données
      // du projet pour préremplir pour l'update
      dispatch(loadProject(params.id));
    }
  }, [dispatch, params.id]);

  // useEffect(() => {
  //   snackThat(error, 'error');
  // }, [error]);

  // useEffect(() => {
  //   snackThat('Projec créé avec succés', 'success');
  // }, [success]);

  // @TODO : set un customHook pour la snackbar ?
  const snackThat = (message, severity) => {
    setSnackMessage(message);
    setOpenSnackbar(true);
    setSeverity(severity);
  };
  // Fonction pour fermer le Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Logique pour créer ou modifier un projet
  const onCreateClickHandler = async (e) => {
    e.preventDefault();
    // validation par regex
    const regex = /^[a-zA-Z0-9\s]+$/; // exemple de regex pour valider les caractères alphanumériques et les espaces
    if (!regex.test(name)) {
      snackThat(
        'Le nom du projet est obligatoire et ne doit contenir que des caractères alphanumériques et des espaces.',
        'error'
      );
      return;
    }

    try {
      const action = await dispatch(submitProjectForm({ id: id, name }));
      const createdOrUpdated = action.payload;

      snackThat('Projet créé/modifié avec succès !', 'success');

      setTimeout(() => {
        navigate(`/projects/${createdOrUpdated.id}`); // à la création ça marche pas ça
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      snackThat('Erreur lors de la création du projet : ' + error, 'error');
    }
  };

  return (
    <div>
      {params.id && <h1>Modification du projet</h1>}
      {!params.id && <h1>Création d'un nouveau projet</h1>}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          required
          id="outlined-required"
          label="Nom du projet"
          value={name}
          focused={!!params.id}
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
          onClick={(e) => onCreateClickHandler(e)}
          disabled={loading}
        >
          {params.id ? 'Modifier' : 'Créer'}
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

export default ProjectFormPage;
