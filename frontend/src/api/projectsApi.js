import config from '../config/config';

export const getAllProjects = async (page) => {
  // fetch projects from the API
  try {
    const response = await fetch(`${config.apiUrls.projects}?page=${page}`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors du chargement des projets :', error);

    return {
      data: [],
      meta: {
        current_page: page,
        last_page: 1,
        total: 0,
        per_page: 5,
      },
    };
  }
};

export const getProjectById = async (id) => {
  const response = await fetch(`${config.apiUrls.projects}/${id}`);

  if (!response.ok) {
    throw new Error('Erreur lors du chargement du projet');
  }

  const res = await response.json();
  console.log(res.data);
  return res.data;
};
