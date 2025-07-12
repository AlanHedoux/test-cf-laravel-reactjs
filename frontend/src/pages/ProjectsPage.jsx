import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
} from '@mui/material';
import TablePaginationActions from '../components/TablePaginationActions';
import { fetchProjects } from '../features/projects/projectsSlice';

const ProjectsPage = () => {
  const [page, setPage] = useState(0); // DataGrid is 0-based

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, meta, loading, error } = useSelector((state) => state.projects);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(fetchProjects(page + 1));
    // dans les extra reducers on gère dejà loading et error
  }, [dispatch, page]); // on dispatch fetchProjects quand on mute le state page

  // à retirer au profit du toast
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>Liste des Projets</h1>

      <Button
        variant="contained"
        onClick={() => {
          navigate('/projects/new');
        }}
        style={{ marginBottom: '20px' }}
      >
        Ajouter un Projet
      </Button>

      {loading && <Loader />}

      {!loading && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow style={{ backgroundColor: '#e2e2e2ff' }}>
                  <TableCell style={{ width: 90 }}>ID</TableCell>
                  <TableCell style={{ width: 300 }}>Nom du Projet</TableCell>
                  <TableCell style={{ width: 150 }}>Tâches</TableCell>
                  <TableCell style={{ width: 150 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => {
                  return (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>{row.name}</TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row.tasks ? row.tasks.length : 0}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            // go to project details page
                            navigate(`/projects/${row.id}`);
                          }}
                        >
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    colSpan={3}
                    count={meta.total || 0}
                    rowsPerPage={meta.per_page || 5}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>

          <div style={{ marginTop: '20px' }}>
            <p>
              Page {meta ? meta.current_page : 1} sur{' '}
              {meta ? meta.last_page : 1}
            </p>
            <p>Total de Projets: {meta ? meta.total : 0}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
