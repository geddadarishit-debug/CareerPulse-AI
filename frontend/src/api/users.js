import api from './api';

export const usersAPI = {
  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  updateMe: async (profileData) => {
    const response = await api.put('/users/me', profileData);
    return response.data;
  },
};
