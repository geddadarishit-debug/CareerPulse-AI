import api from './api';

export const resumeAPI = {
  upload: async (formData) => {
    const response = await api.post('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getMyResumes: async () => {
    const response = await api.get('/resumes/my-resumes');
    return response.data;
  },
};
