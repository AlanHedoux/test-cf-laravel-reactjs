import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePaginationActions from '../components/TablePaginationActions';
import {
  deleteTask,
  fetchProjectById,
} from '../features/projects/projectsSlice';

const ProjectDetailPage = () => {
  // récupération de l'ID du projet depuis l'URL
  const { id } = useParams();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // get From global State (redux)
  const project = useSelector((state) => state.projects.current);
  const loading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error || !project)
    return <ErrorMessage message={error || 'Projet introuvable'} />;

  const handleCloseDialog = () => {
    // just close dialog
    setOpenDialog(false);
  };

  const handleCloseDeleteTask = async () => {
    try {
      console.log('delete this task : ', id, selectedTaskId);
      await dispatch(
        deleteTask({ projectId: id, taskId: selectedTaskId })
      ).unwrap();
      //snackThat('Tâche supprimée avec succès', 'success');
      console.log('tache supprimé');
    } catch (err) {
      console.error(err);
      console.error('Erreur lors de la suppression de la tâche', 'error');
      //snackThat('Erreur lors de la suppression de la tâche', 'error');
    } finally {
      handleCloseDialog();
    }
  };

  // permet de retenir la task à supprimer
  const handleOpenDeleteDialog = (taskId) => {
    setSelectedTaskId(taskId);
    setOpenDialog(true);
  };

  return (
    <div>
      <h1>Project {project.name}</h1>

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
            {project.tasks.map((task) => (
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
                      onClick={() => handleOpenDeleteDialog(task.id)}
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vous etes sur le point de supprimer une tache, Continuer ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteTask}>Oui</Button>
          <Button onClick={handleCloseDialog} autoFocus>
            Non
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectDetailPage;
