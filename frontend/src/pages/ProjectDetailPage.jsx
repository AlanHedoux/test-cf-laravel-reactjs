import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePaginationActions from '../components/TablePaginationActions';

const ProjectDetailPage = () => {
  // récupération de l'ID du projet depuis l'URL
  const { id } = useParams();

  const [projectWithTasks, setProjectWithTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProjectWithTasks = async (projectId) => {
    try {
      // @TODO ajouter une validation pour l'ID du projet
      const response = await fetch(
        `http://localhost:8080/api/projects/${projectId}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProjectWithTasks(data);
    } catch (err) {
      setError('Impossible de récupérer les détails du projet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProjectWithTasks(id);
    } else {
      setError('Aucun ID de projet fourni.');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div>
      <h1>Project {projectWithTasks.data.name}</h1>

      {/* Affichage des taches du projet */}
      <Stack direction="row" spacing={2} marginBottom={2}>
        <Button
          variant="contained"
          onClick={() => navigate(`/projects/${id}/edit`)}
        >
          Modifier le Projet
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(`/tasks/new?projectId=${id}`)}
        >
          Ajouter une Tâche
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="project tasks table">
          <TableHead>
            <TableRow style={{ backgroundColor: '#e2e2e2ff' }}>
              <TableCell style={{ width: 90 }}>ID</TableCell>
              <TableCell style={{ width: 300 }}>Nom de la Tâche</TableCell>
              <TableCell style={{ width: 150 }}>Statut</TableCell>
              <TableCell style={{ width: 150 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectWithTasks.data.tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/tasks/${task.id}/edit`)}
                    >
                      Modifier
                    </Button>
                    <Button
                      startIcon={<DeleteIcon />}
                      variant="outlined"
                      color="error"
                      onClick={() => alert('Suppression , modal à implémenter')}
                    >
                      Supprimer
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectDetailPage;
