// // components/ExampleComponent.tsx
// import { useQuery } from 'react-query';
// import axios from 'axios';

// // Fungsi untuk mengambil data dari API pertama
// const fetchDataFromFirstAPI = async () => {
//   const response = await axios.get('https://api-staging.friandy.web.id/api/get-province');
//   return response.data.id; // Mengambil ID dari data API pertama
// };

// // Fungsi untuk mengambil data dari API kedua berdasarkan ID
// const fetchDataFromSecondAPI = async (id: string) => {
//   const response = await axios.get(`https://api-staging.friandy.web.id/api/get-province/${id}`);
//   return response.data;
//   console.log(response.data)
// };

// const ExampleComponent = () => {
//   // Menggunakan React Query untuk mengambil data dari API pertama
//   const { data: idData } = useQuery('firstAPI', fetchDataFromFirstAPI);

//   // Menggunakan React Query untuk mengambil data dari API kedua berdasarkan ID
//   const { data: secondAPIData } = useQuery(['secondAPI', idData], () => fetchDataFromSecondAPI(idData), {
//     enabled: !!idData, // Memastikan query hanya dijalankan jika ID sudah tersedia
//   });

//   // Render UI sesuai kebutuhan// components/CustomSelect.tsx

import React, { useState } from 'react';

interface CustomSelectProps {
  options: string[];
  onChange: (selectedOption: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customOption, setCustomOption] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue === 'other') {
      setSelectedOption(null);
    } else {
      setSelectedOption(selectedValue);
      onChange(selectedValue);
    }
  };

  const handleCustomInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomOption(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="customSelect">Pilih Opsi:</label>
      <select id="customSelect" value={selectedOption || 'other'} onChange={handleSelectChange}>
        <option>Buku</option>
        <option>Pensil</option>
        <option>Penghapus</option>
        <option value="other">Lainnya</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {selectedOption === null && (
        <div>
          <label htmlFor="customOption">Pilihan Lainnya:</label>
          <input
            type="text"
            id="customOption"
            value={customOption}
            onChange={handleCustomInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default CustomSelect;

//   return (
//     <div>
//       <h1>Data dari API Pertama</h1>
//       {idData && <p>ID: {idData}</p>}

//       <h1>Data dari API Kedua</h1>
//       {secondAPIData && <p>Data: {JSON.stringify(secondAPIData)}</p>}
//     </div>
//   );
// };

// export default ExampleComponent;