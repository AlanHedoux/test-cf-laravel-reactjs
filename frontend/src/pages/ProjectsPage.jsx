import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const fetchProjects = async () => {
  // Simulate fetching projects from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: 2,
            name: 'aut',
            tasks: [
              {
                id: 6,
                title: 'Et voluptas facilis quasi excepturi.',
                status: 'completed',
                project_id: 2,
              },
              {
                id: 7,
                title: 'Ut dolores similique corrupti dolorem.',
                status: 'completed',
                project_id: 2,
              },
              {
                id: 8,
                title: 'Labore recusandae beatae quia.',
                status: 'completed',
                project_id: 2,
              },
              {
                id: 9,
                title: 'Placeat veniam unde possimus quo quasi et sit.',
                status: 'pending',
                project_id: 2,
              },
              {
                id: 10,
                title: 'In voluptas id assumenda est occaecati et molestias.',
                status: 'pending',
                project_id: 2,
              },
            ],
          },
          {
            id: 3,
            name: 'ut',
            tasks: [
              {
                id: 11,
                title: 'Voluptate neque nihil modi qui et odit voluptatem.',
                status: 'completed',
                project_id: 3,
              },
              {
                id: 12,
                title: 'Quos omnis et eveniet quia nisi corrupti qui.',
                status: 'completed',
                project_id: 3,
              },
              {
                id: 13,
                title: 'Hic consequatur id blanditiis neque rerum sit natus.',
                status: 'completed',
                project_id: 3,
              },
              {
                id: 14,
                title: 'Voluptate qui ratione debitis et.',
                status: 'pending',
                project_id: 3,
              },
              {
                id: 15,
                title: 'Quisquam ipsum eos rerum ut est enim qui.',
                status: 'pending',
                project_id: 3,
              },
            ],
          },
          {
            id: 4,
            name: 'quo',
            tasks: [
              {
                id: 16,
                title: 'Qui molestiae reprehenderit quasi eum.',
                status: 'completed',
                project_id: 4,
              },
              {
                id: 17,
                title: 'Sapiente distinctio enim cum ex harum repellat.',
                status: 'pending',
                project_id: 4,
              },
              {
                id: 18,
                title: 'Iusto veniam facilis dolores corrupti.',
                status: 'pending',
                project_id: 4,
              },
              {
                id: 19,
                title: 'Veniam incidunt adipisci sed praesentium.',
                status: 'completed',
                project_id: 4,
              },
              {
                id: 20,
                title: 'Omnis et autem ut velit earum nemo.',
                status: 'completed',
                project_id: 4,
              },
            ],
          },
          {
            id: 5,
            name: 'odit',
            tasks: [
              {
                id: 21,
                title: 'Nostrum optio hic velit minus veritatis.',
                status: 'pending',
                project_id: 5,
              },
              {
                id: 22,
                title: 'Est qui iste molestiae ducimus ad natus assumenda.',
                status: 'completed',
                project_id: 5,
              },
              {
                id: 23,
                title: 'Sed dolorem quia voluptatem quo aut et.',
                status: 'completed',
                project_id: 5,
              },
              {
                id: 24,
                title: 'Repellendus fuga ut laboriosam sint tempora non.',
                status: 'pending',
                project_id: 5,
              },
              {
                id: 25,
                title: 'Similique sit eaque mollitia sunt voluptate.',
                status: 'pending',
                project_id: 5,
              },
            ],
          },
          {
            id: 6,
            name: 'tempora',
            tasks: [
              {
                id: 26,
                title: 'Architecto eos quos quia asperiores velit minima.',
                status: 'pending',
                project_id: 6,
              },
              {
                id: 27,
                title: 'Ipsam molestiae reprehenderit omnis.',
                status: 'completed',
                project_id: 6,
              },
              {
                id: 28,
                title: 'Dolores et commodi aut labore et.',
                status: 'pending',
                project_id: 6,
              },
              {
                id: 29,
                title: 'Possimus ut quidem inventore natus rerum.',
                status: 'completed',
                project_id: 6,
              },
              {
                id: 30,
                title: 'Illum optio consequatur deleniti.',
                status: 'completed',
                project_id: 6,
              },
            ],
          },
        ],
        links: {
          first: 'http://localhost:8080/api/projects?page=1',
          last: 'http://localhost:8080/api/projects?page=2',
          prev: null,
          next: 'http://localhost:8080/api/projects?page=2',
        },
        meta: {
          current_page: 1,
          from: 1,
          last_page: 2,
          links: [
            {
              url: null,
              label: '&laquo; Previous',
              active: false,
            },
            {
              url: 'http://localhost:8080/api/projects?page=1',
              label: '1',
              active: true,
            },
            {
              url: 'http://localhost:8080/api/projects?page=2',
              label: '2',
              active: false,
            },
            {
              url: 'http://localhost:8080/api/projects?page=2',
              label: 'Next &raquo;',
              active: false,
            },
          ],
          path: 'http://localhost:8080/api/projects',
          per_page: 5,
          to: 5,
          total: 9,
        },
      });
    }, 3000);
  });
};

const ProjectsPage = () => {
  let navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const projects = await fetchProjects();
      setProjects(projects);
      setLoading(false);
    };

    loadProjects();
  }, []);

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
          <DataGrid
            rows={projects.data || []}
            columns={[
              { field: 'id', headerName: 'ID', width: 90 },
              { field: 'name', headerName: 'Nom du Projet', width: 200 },
              {
                field: 'tasks',
                headerName: 'Tâches',
                width: 150,
                valueGetter: (params) => {
                  return '5'; // @TODO rendre dynamique
                },
              },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 150,
                renderCell: (params) => (
                  <strong>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        // go to project details page
                        navigate(`/projects/${params.row.id}`);
                      }}
                    >
                      Détails
                    </Button>
                  </strong>
                ),
              },
            ]}
            pageSize={5}
            pageSizeOptions={[]}
            disableSelectionOnClick
            getRowId={(row) => row.id}
            rowCount={projects.meta ? projects.meta.total : 0}
            pagination
            paginationMode="server"
            onPageChange={(newPage) => {
              // Handle page change
            }}
          />

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
