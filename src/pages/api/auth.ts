import axios from "axios";
import { setAuthToken, removeAuthToken, setLinkPayment, setName } from './authUtils';


export const registerUser = async(data: any) => {
  const response = await axios.post('https://api-staging.friandy.web.id/api/customer/register', data)
  setLinkPayment(response.data.data.transaction.data.payment_url)
  console.log(response.data)
  return response.data;
}

export const login = async (credentials: { whatsapp: string; password: string }) => {
  const response = await axios.post('https://api-staging.friandy.web.id/api/customer/login', credentials);
  setName(response.data.data.name)
  setAuthToken(response.data.data.token);
  console.log(response.data)
  return response.data;
};

// Fungsi untuk logout
export const logout = async () => {
  removeAuthToken()
  // Lakukan panggilan API logout di sini
  // Contoh:
  // const response = await axios.post('https://api-staging.friandy.web.id/api/customer/logout');
  // console.log(response)
  // return response.data
};
