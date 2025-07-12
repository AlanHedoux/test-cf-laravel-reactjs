import config from '../config/config';

export const submitProject = async (formData) => {
  return new Promise(async (resolve) => {
    try {
      const finalUrl = !!formData.id
        ? config.apiUrls.projects + '/' + formData.id
        : config.apiUrls.projects;
      const response = await fetch(finalUrl, {
        method: !!formData.id ? 'PUT' : 'POST', // Si on a passé un id
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      resolve(response.json());
    } catch (error) {
      resolve(error);
    }
  });
};
