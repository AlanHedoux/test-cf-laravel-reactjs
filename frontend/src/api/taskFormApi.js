import config from '../config/config';
import { statusEnum } from '../constants/statusEnum';

// Envoie une tâche au backend (POST si création, PUT si mise à jour)
export const submitTask = async (formData) => {
  const url = formData.id
    ? `${config.apiUrls.tasks}/${formData.id}`
    : `${config.apiUrls.tasks}`;

  const method = formData.id ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: formData.title,
      project_id: formData.projectId,
      status: formData.status || statusEnum.PENDING,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || 'Erreur lors de la soumission de la tâche'
    );
  }

  return await response.json();
};
