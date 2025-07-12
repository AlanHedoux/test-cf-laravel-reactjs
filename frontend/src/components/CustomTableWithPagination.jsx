import { PropTypes } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
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

// @TODO à terminer
const CustomTableWithPagination = ({ items }) => {
  let navigate = useNavigate();

  return (
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
          {items.data.map((row) => {
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
  );
};

CustomTableWithPagination.propTypes = {
  items: PropTypes.shape({
    data: PropTypes.array.isRequired,
    meta: PropTypes.shape({
      total: PropTypes.number,
      per_page: PropTypes.number,
    }),
  }).isRequired,
};

export default CustomTableWithPagination;
