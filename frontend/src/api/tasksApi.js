import config from '../config/config';

export const getTaskById = async (id) => {
  const response = await fetch(`${config.apiUrls.tasks}/${id}`);

  if (response.status !== 200 && response.status !== 204) {
    throw error('error de ma requette http de suppression de tâche');
  }
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    return data.data;
  } else {
    console.warn('Réponse sans JSON valide', await response.text());
    return null;
  }
};

export const deleteTask = async (id) => {
  const response = await fetch(`${config.apiUrls.tasks}/${id}`, {
    method: 'DELETE',
  });

  if (response.status !== 200 && response.status !== 204) {
    throw error('error de ma requette http de suppression de tâche');
  }
  return response.data;
};
