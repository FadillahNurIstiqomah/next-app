// import axios from "axios";
// import { useMutation } from "react-query";

// const login = async (data: formLogin) => {
//     const response = await axios.post('https://api-staging.friandy.web.id/api/customer/login', data);
//     return response.data;
// };

// export const useLoginMutation = () => {
//     return useMutation(login);
// }

// auth.ts

import { useMutation, useQuery, useQueryClient } from 'react-query';

// Fungsi untuk login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (credentials: { whatsapp: string; password: string }) => {
      // Lakukan logika autentikasi di sini
      // Contoh: panggil API untuk login
      const response = await fetch('https://api-staging.friandy.web.id/api/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log(data)

      // Simpan token atau informasi autentikasi lainnya di sini
      const authToken = data.data.token;
      console.log(authToken)

      // Simpan token di cache
      queryClient.setQueryData('authToken', authToken);

      return data;
    },
    {
      onSuccess: () => {
        // Invalidate query untuk menyegarkan data setelah login
        queryClient.invalidateQueries('userData');
      },
    }
  );
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    // Hapus token dari react-query cache saat logout
    queryClient.setQueryData("authToken", null);
  }

// // Fungsi untuk mendapatkan data pengguna setelah login
// export const useUserData = () => {
//   return useQuery('userData', async () => {
//     // Lakukan logika untuk mendapatkan data pengguna
//     // Contoh: panggil API untuk mendapatkan data pengguna
//     const response = await fetch('/api/userData');
//     const data = await response.json();

//     return data;
//   });
// };
