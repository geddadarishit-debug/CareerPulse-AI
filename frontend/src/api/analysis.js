import api from './api';
import { normalizeAnalysis } from '../utils/normalizeAnalysis';

export const analysisAPI = {
  run: async (resumeId) => {
    const response = await api.post(`/analysis/run/${resumeId}`);
    return normalizeAnalysis(response.data);
  },
  getHistory: async () => {
    const response = await api.get('/analysis/history');
    return (response.data || []).map(normalizeAnalysis);
  },
  getById: async (analysisId) => {
    const response = await api.get(`/analysis/${analysisId}`);
    return normalizeAnalysis(response.data);
  },
};
