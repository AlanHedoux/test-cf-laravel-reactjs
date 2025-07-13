import config from '../config/config';

export const getAllTasks = async (page) => {
  return {};
};

export const getTaskById = async (id) => {
  return {};
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
