import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Snackbar,
  FormControl,
  Alert,
} from '@mui/material';
import { inputBaseClasses } from '@mui/material/InputBase';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const ProjectFormPage = () => {
  const params = useParams(); // Utilisé pour récupérer l'ID du projet si nécessaire
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [projectName, setProjectName] = useState('');
  const [severity, setSeverity] = useState('info');

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

  const onChangeHandler = (e) => {
    setProjectName(e.target.value);
  };

  // Logique pour créer ou modifier un projet
  const onCreateClickHandler = async (e) => {
    e.preventDefault();
    // validation par regex
    const regex = /^[a-zA-Z0-9\s]+$/; // exemple de regex pour valider les caractères alphanumériques et les espaces
    if (!regex.test(projectName)) {
      snackThat(
        'Le nom du projet est obligatoire et ne doit contenir que des caractères alphanumériques et des espaces.',
        'error'
      );
      return;
    }

    try {
      // fait une requête POST ou PUT vers l'API
      const response = await fetch('http://localhost:8080/api/projects', {
        // @TODO gérer l'update
        method: params.id ? 'PUT' : 'POST', // si l'ID est présent, on modifie, sinon on crée
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: params.id || null, // si l'ID est présent, on l'envoie, sinon on envoie null
          name: projectName, // @TODO ajotuer la validation
        }),
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Error ' + response.status);
      }

      snackThat('Projet créé avec succès !', 'success');
      // rediriger vers la page de détails du projet après 3 secondes
      setTimeout(() => {
        navigate(`/projects/${response.data.id}`);
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      snackThat(
        'Erreur lors de la création du projet ' + error.message,
        'error'
      );
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
          onChange={(e) => onChangeHandler(e)}
          sx={{
            input: { color: 'white' }, // couleur du texte saisi
            label: { color: 'white' }, // couleur du label
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
        <Button variant="contained" onClick={(e) => onCreateClickHandler(e)}>
          Créer
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
