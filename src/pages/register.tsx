import Link from "next/link";
import * as Yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import bg from '../../public/property.jpg'
import Image from "next/image";
import logo from '../../public/logo.png'
import { useEffect, useState } from "react";
import axios from 'axios';

const schema = Yup.object().shape({
  name : Yup.string().required(),
  province : Yup.string().required(),
  city : Yup.string().required(),
  sales : Yup.string().required(),
  project :  Yup.string().required(),
  unit_type : Yup.string().required(),
  whatsapp: Yup.string().required().min(12),
  password: Yup.string().required().min(7),
  password_confirmation : Yup.string().required().min(7).oneOf([Yup.ref("password"), ''], 'Password must match'),
});
type FormType = {
  id_number : string;
  name : string;
  email : string;
  province : string;
  city : string;
  profession : string;
  sales : string;
  project : string;
  unit_type : string;
  whatsapp : string;
  password : string;
  password_confirmation : string;
};
interface Province {
  name: string;
  id: string;
}
export default function RegisterPage() {
  const [provinces , setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);


  // const [posts, setPosts] = useState<FormType[]>([]);
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<FormType>({
      // resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => console.log(data);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://api-staging.friandy.web.id/api/get-province');
          setProvinces(response.data.data);
          console.log(response.data.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
        fetchData();
    }, []);
      const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProvince(event.target.value);
      };
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
                    <select
                      className="w-full mt-2 border rounded-md p-[10px]"
                      {...register('province')}
                    >
                      <option value="" disabled hidden selected>Pilih</option>
                      {provinces && provinces.map(e => (
                        <option key={e.id} value={e.id}>
                        {e.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500 text-[14px] my-1">{errors.province?.message}</p>
                  </div>
                  <div className="w-full my-1">
                    <label htmlFor="city" className="block text-md font-semibold text-gray-800">Kota</label>
                    <select
                      className="w-full mt-2 border rounded-md p-[10px]"
                      {...register('city')}
                    >
                      <option value="" disabled hidden selected>Pilih</option>
                      <option value="city_1">Kota 1</option>
                      <option value="city_2">Kota 2</option>
                    </select>
                    <p className="text-red-500 text-[14px] my-1">{errors.city?.message}</p>
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
                      <option value="profesi_1">Profesi 1</option>
                      <option value="profesi_2">Profesi 2</option>
                    </select>
                  </div>
                  <div className="w-full my-1">
                    <label htmlFor="sales" className="block text-md font-semibold text-gray-800">
                      Nama Marketing
                    </label>
                    <select
                      className="w-full mt-2 border rounded-md p-[10px]"
                      {...register('sales')}
                    >
                      <option value="" disabled hidden selected>Pilih</option>
                      <option value="sales_1">Sales 1</option>
                      <option value="sales_2">Sales 2</option>
                    </select>
                    <p className="text-red-500 text-[14px] my-1">{errors.sales?.message}</p>
                  </div>
                  <div className="w-full my-1">
                    <label htmlFor="project" className="block text-md font-semibold text-gray-800">
                      Nama Project
                    </label>
                    <select
                      className="w-full mt-2 border rounded-md p-[10px]"
                      {...register('project')}
                    >
                      <option value="" disabled hidden selected>Pilih</option>
                      <option value="project_1">Project 1</option>
                      <option value="project_2">Project 2</option>
                    </select>
                    <p className="text-red-500 text-[14px] my-1">{errors.project?.message}</p>
                  </div>
                  <div className="w-full my-1">
                    <label htmlFor="unit" className="block text-md font-semibold text-gray-800">
                      Tipe Unit
                    </label>
                    <select
                      className="w-full mt-2 border rounded-md p-[10px]"
                      {...register('unit_type')}
                    >
                      <option value="" disabled hidden selected>Pilih</option>
                      <option value="unit_type_1">Unit 1</option>
                      <option value="unit_type_2">Unit 2</option>
                    </select>
                    <p className="text-red-500 text-[14px] my-1">{errors.unit_type?.message}</p>
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