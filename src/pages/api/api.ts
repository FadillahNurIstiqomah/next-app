// api.ts
import axios from 'axios';

export const fetchProvince = async () => {
  const response = await axios.get('https://api-staging.friandy.web.id/api/get-province');
  return response.data.data;
};
export const fetchCity = async (province_id: string) => {
  const response = await axios.get(`https://api-staging.friandy.web.id/api/get-province/${province_id}`);
  return response.data.data.cities;
};
export const fetchSales = async () => {
  const response = await axios.get(`https://api-staging.friandy.web.id/api/get-marketings`);
  return response.data.data;
};
export const fetchProject = async () => {
  const response = await axios.get(`https://api-staging.friandy.web.id/api/get-project`);
  return response.data.data;
};
export const fetchUnit = async (project_id: string) => {
  const response = await axios.get(`https://api-staging.friandy.web.id/api/get-project/${project_id}`);
  return response.data.data.unit_types;
};