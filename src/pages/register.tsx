import Link from "next/link";
import * as Yup from 'yup'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import bg from '../../public/property.jpg'
import Image from "next/image";
import logo from '../../public/logo.png'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useQuery } from 'react-query';
import { fetchCity, fetchProject, fetchProvince, fetchSales, fetchUnit } from "./api/api";
import { useParams } from "next/navigation";

const schema = Yup.object().shape({
  id_number : Yup.string().nullable(),
  name : Yup.string().required(),
  email : Yup.string().email('Email Invalid!').nullable(),
  province_id : Yup.string().required(),
  city_id : Yup.string().required(),
  profession : Yup.string().nullable(),
  sales_id : Yup.string().required(),
  project_id :  Yup.string().required(),
  unit_type_id : Yup.string().required(),
  whatsapp: Yup.string().required().min(12),
  password: Yup.string().required().min(7),
  password_confirmation : Yup.string().required().min(7).oneOf([Yup.ref("password"), ''], 'Password must match'),
});

interface FormType {
  id_number? : string | null;
  name : string;
  email? : string | null;
  province_id : string;
  city_id : string;
  profession? : string | null;
  sales_id : string;
  project_id : string;
  unit_type_id : string;
  whatsapp : string;
  password : string;
  password_confirmation : string;
};

// interface Province {
//   name: string;
//   id: string;
// }
export default function RegisterPage() {
  // const [select1Value, setSelect1Value] = useState<string | null>(null);
  // const [select2Value, setSelect2Value] = useState<string | null>(null);
  // const [select2Disabled, setSelect2Disabled] = useState(true);
  // const [provinces , setProvinces] = useState<Province[]>([]);
  // const [selectedProvince, setSelectedProvince] = useState<string | null>(null);


  // Select
  // const handleSelect1Change = (value: string | null) => {
  //   setSelect1Value(value);
  //   // Enable select2 and reset its value when select1 changes
  //   setSelect2Disabled(false);
  //   setSelect2Value(null);
  // };

  // const handleSelect2Change = (value: string | null) => {
  //   setSelect2Value(value);
  // };

  // const [posts, setPosts] = useState<FormType[]>([]);
    const {
      setValue,
      watch,
      control,
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<FormType>({
      resolver: yupResolver(schema)
    });
    // const { control, setValue, watch } = useForm<FormType>();
  const select1Value = watch('province_id');
  const onSubmit = (data: any) => console.log(data);


    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await axios.get('https://api-staging.friandy.web.id/api/get-province');
    //       setProvinces(response.data.data);
    //       console.log(response.data.data)
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
    //     fetchData();
    // }, []);
      // const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      //   setSelectedProvince(event.target.value);
      // };

      // Fetch data from API 1
      const { data: dataApi1 } = useQuery('api1', fetchProvince);
      console.log(dataApi1)

      // Fetch data from API 2
      const { data: dataApi2 } = useQuery(
        ['api2', dataApi1?.[0].id],
        () => fetchCity(dataApi1?.[0].id),
        {
          enabled: !!dataApi1?.[0].id,
        }
      );
      console.log(dataApi1?.id)

      // Fetch data from API 3
      const { data: dataApi3 } = useQuery('api3', fetchSales);
      // console.log(dataApi3)

      // Fetch data from API 3
      const { data: dataApi4 } = useQuery('api4', fetchProject);
      // console.log(dataApi4)

      // Fetch data from API 3
      const { data: dataApi5 } = useQuery('api5', fetchUnit);
      // console.log(dataApi5)

      // if (isLoadingApi1 || isLoadingApi2 || isLoadingApi3 || isLoadingApi4) {
      //   return <p>Loading...</p>;
      // }
    return (
      <div>
        <div className="relative flex flex-col items-center overflow-hidden">
          <div className="absolute -z-10 w-full h-[10px]">
            <Image
            src={bg}
            alt="background"
            className="opacity-70 scale-[2.0]"
            />
          </div>
          <div className="w-full m-10 p-6 bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-2xl font-bold text-center text-gray-700">REGISTER</h1>
            <p className="text-black text-md my-3">Register to choose your right property</p>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full">
                <h1 className="bg-slate-200 w-full text-center p-2">Data Diri</h1>
                  <label htmlFor="id_number" className="block text-md font-semibold text-gray-800">
                    No. KTP
                    <span className="text-slate-400 ml-2">(Opsional)</span>
                  </label>
                  <input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    type="text"
                    {...register("id_number")}
                  />
                  <p className="text-red-500 text-[14px] my-1">{errors.id_number?.message}</p>
                  <label htmlFor="name" className="block text-md font-semibold text-gray-800">
                    Nama (Sesuai KTP)
                  </label>
                  <input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    type="text"
                    {...register("name")}
                  />
                  <p className="text-red-500 text-[14px] my-1">{errors.name?.message}</p>
                  <label htmlFor="email" className="block text-md font-semibold text-gray-800">
                    Email
                    <span className="text-slate-400 ml-2">(Opsional)</span>
                  </label>
                  <input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    type="text"
                    {...register("email")}
                  />
                  <p className="text-red-500 text-[14px] my-1">{errors.email?.message}</p>
                  <div className="w-full my-1">
                    {/* <Province/> */}
                    <label htmlFor="province" className="block text-md font-semibold text-gray-800">Provinsi</label>
                    <Controller 
                      name="province_id"
                      control={control}
                      defaultValue=""
                      render={({ }) => (
                        <select
                          className="w-full mt-2 border rounded-md p-[10px]"
                          {...register('province_id')}
                        >
                          <option value="" disabled hidden selected>Pilih</option>
                          {dataApi1 && dataApi1.map((e: any) => (
                            <option key={e.id} value={e.id}>
                            {e.name}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    <p className="text-red-500 text-[14px] my-1">{errors.province_id?.message}</p>
                  </div>
                  <div className="w-full my-1">
                    <label htmlFor="city" className="block text-md font-semibold text-gray-800">Kota</label>
                    <Controller
                      name="city_id"
                      control={control}
                      defaultValue=""
                      render={({ }) => (
                        <select
                          className="w-full mt-2 border rounded-md p-[10px]"
                          disabled={!select1Value}
                          {...register('city_id')}
                        >
                          <option value="" disabled hidden selected>Pilih</option>
                          {dataApi2 && dataApi2.map((e: any) => (
                            <option key={e.id} value={e.id}>
                            {e.name}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    <p className="text-red-500 text-[14px] my-1">{errors.city_id?.message}</p>
                  </div>
                  <div className="w-full my-1">
                    <label htmlFor="profession" className="block text-md font-semibold text-gray-800">
                      Profesi
                      <span className="text-slate-400 ml-2">(Opsional)</span>
                    </label>
                    <select
                      className="w-full mt-2 border rounded-md p-[10px]"    
                      {...register('profession')}
                    >
                      <option value="" disabled hidden selected>Pilih</option>
                      <option value="ASN">Aparatur Sipil Negara (ASN)</option>
                      <option value="Karyawan BUMN">Karyawan BUMN</option>
                      <option value="Karyawan Swasta">Karyawan Swasta</option>
                      <option value="Wirausahawan">Wirausahawan</option>
                      <option value="TNI/Polri">TNI/Polri</option>
                      <option value="Karyawan Honorer">Karyawan Honorer</option>
                      <option value="Mahasiswa">Mahasiswa</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div className="w-full my-1">
                    <label htmlFor="sales" className="block text-md font-semibold text-gray-800">
                      Nama Marketing
                    </label>
                    <select
                      className="w-full mt-2 border rounded-md p-[10px]"
                      {...register('sales_id')}
                    >
                      <option value="" disabled hidden selected>Pilih</option>
                      {dataApi3 && dataApi3.map((e: any) => (
                        <option key={e.id} value={e.id}>
                        {e.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500 text-[14px] my-1">{errors.sales_id?.message}</p>
                  </div>
                  <div className="w-full my-1">
                    <label htmlFor="project" className="block text-md font-semibold text-gray-800">
                      Nama Project
                    </label>
                    <select
                      className="w-full mt-2 border rounded-md p-[10px]"
                      {...register('project_id')}
                    >
                      <option value="" disabled hidden selected>Pilih</option>
                      {dataApi4 && dataApi4.map((e: any) => (
                        <option key={e.id} value={e.id}>
                        {e.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500 text-[14px] my-1">{errors.project_id?.message}</p>
                  </div>
                  <div className="w-full my-1">
                    <label htmlFor="unit" className="block text-md font-semibold text-gray-800">
                      Tipe Unit
                    </label>
                    <select
                      className="w-full mt-2 border rounded-md p-[10px]"
                      {...register('unit_type_id')}
                    >
                      <option value="" disabled hidden selected>Pilih</option>
                      {dataApi5 && dataApi5.map((e: any) => (
                        <option key={e.id} value={e.id}>
                        {e.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500 text-[14px] my-1">{errors.unit_type_id?.message}</p>
                  </div>
                <h1 className="bg-slate-200 w-full text-center p-2">Data Login</h1>
                  <label htmlFor="whatsapp" className="block text-md font-semibold text-gray-800">WhatsApp</label>
                  <input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    type="text"
                    {...register("whatsapp")}
                  />
                  <p className="text-red-500 text-[14px] my-1">{errors.whatsapp?.message}</p>
                  <label htmlFor="password" className="block text-md font-semibold text-gray-800">Password</label>
                  <input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    type="password"
                    {...register("password")}
                  />
                  <p className="text-red-500 text-[14px] my-1">{errors.password?.message}</p>
                  <label htmlFor="password_confirmation" className="block text-md font-semibold text-gray-800">Password Confirmation</label>
                  <input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    type="password"
                    {...register("password_confirmation")}
                  />
                  <p className="text-red-500 text-[14px] my-1">{errors.password_confirmation?.message}</p>
                  <button 
                    type="submit" 
                    className="w-full px-4 py-2 my-4 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  >
                    Register
                  </button>
              </form>
            <p className="mt-4 text-sm text-center text-gray-700">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
            <Image 
              src={logo}
              alt="logo"
              className="w-[160px] h-[80px] ml-[180px] mt-3"
            />
          </div>
        </div>
      </div>
    );
  }