import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

// @TODO à gérer avec react query
const fetchProjects = async (page = 1) => {
  // Simulate fetching projects from an API
  return new Promise((resolve) => {
    fetch('http://localhost:8080/api/projects?page=' + page)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        resolve({
          data: [],
          meta: {
            current_page: page,
            last_page: 1,
            total: 0,
            per_page: 5,
          },
        });
      });
  });
};

const ProjectsPage = () => {
  let navigate = useNavigate();
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // DataGrid is 0-based
  const [error, setError] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchProjects(page + 1)
      .then((response) => {
        setProjects(response);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch projects');
        setLoading(false);
      });
  }, [page]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>Liste des Projets</h1>

      <Button
        variant="contained"
        onClick={() => {
          navigate('/projects/create');
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
                <TableRow>
                  <TableCell style={{ width: 90 }}>ID</TableCell>
                  <TableCell style={{ width: 300 }}>Nom du Projet</TableCell>
                  <TableCell style={{ width: 150 }}>Tâches</TableCell>
                  <TableCell style={{ width: 150 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.data.map((row) => {
                  console.log(row);
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
                    count={projects.meta.total || 0}
                    rowsPerPage={projects.meta.per_page || 5}
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
              Page {projects.meta ? projects.meta.current_page : 1} sur{' '}
              {projects.meta ? projects.meta.last_page : 1}
            </p>
            <p>Total de Projets: {projects.meta ? projects.meta.total : 0}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
