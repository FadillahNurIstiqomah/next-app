import Link from "next/link";
import * as Yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";
import bg from '../../public/property.jpg'
import logo from '../../public/logo.png'
import { login } from "./api/auth";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import Swal from 'sweetalert2';

const schema = Yup.object().shape({
  whatsapp: Yup.string().required().min(12),
  password: Yup.string().required().min(7),
});

type FormLogin = {
  whatsapp: string;
  password: string;
};

export default function LoginPage() {
    const router = useRouter();

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<FormLogin>({
      resolver: yupResolver(schema)
    });

    const mutation = useMutation(login, {
      onSuccess: (login) => {
        if (login) {
          router.push('/main')
        } 
      },
      onError: (error) => {
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email atau Password Salah!',
          });
        }
      },
    });

    const onSubmit = (data: { whatsapp: string; password: string }) => {
      mutation.mutate(data);
    };

    return (
      <div>
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <div className="absolute -z-10 w-full min-h-screen">
              <Image
              src={bg}
              alt="background"
              className="opacity-70 scale-[2.0]"
              />
          </div>
          <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-2xl font-bold text-center text-gray-700 my-3">LOGIN</h1>
            <p className="text-black text-md my-3">Login to choose your right property.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full">
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
              <button 
                type="submit" 
                disabled={mutation.isLoading}
                className="w-full px-4 py-2 my-4 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-sm text-center text-gray-700">
              Don`t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Register
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