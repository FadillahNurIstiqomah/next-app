import Image from "next/image";
import Link from "next/link";
import bg from '../../public/property.jpg'
import logo from '../../public/logo.png'
import { useMutation } from "react-query";
import { logout } from "./api/auth";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { useRouter } from "next/router";


export default function Main() {
  const router = useRouter();
  const name = Cookies.get('user name');
  const token = Cookies.get('authToken')

  const mutation = useMutation(logout, {
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'BERHASIL LOGOUT',
        text: 'Terima kasih telah menggunakan website ini.',
      });
    }
  });
  
  // if (!token) {
  //   // router.push('/login');
  // }
  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <div>
      {token ? (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <div className="absolute -z-10 w-full min-h-screen">
            <Image
              src={bg}
              alt="background"
              className="opacity-70 lg:scale-[2.0] scale-[3.0]"
            />
          </div>
          <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-bold text-center text-gray-700 my-3">Hello, {name} kamu berhasil login!</h1>
              <Link
                href="/login"
              >
                <button
                  disabled={mutation.isLoading}
                  onClick={handleLogout} 
                  className="w-full px-4 py-2 my-4 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  {mutation.isLoading ? 'Logging out...' : 'Logout'}
                </button>
              </Link>
              <Image 
                src={logo}
                alt="logo"
                className="w-[160px] h-[80px] lg:ml-[180px] ml-[60px] mt-3"
              />
          </div>
        </div>
      ) : (
        <div>
          <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="absolute -z-10 w-full min-h-screen">
              <Image
                src={bg}
                alt="background"
                className="opacity-70 lg:scale-[2.0] scale-[3.0]"
              />
            </div>
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
              <h1 className="text-3xl font-bold text-center text-gray-700 my-3">Restricted Page, Please Login</h1>
                <Link
                  href="/login"
                >
                  <button
                    className="w-full px-4 py-2 my-4 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  >
                    Login
                  </button>
                </Link>
                <Image 
                  src={logo}
                  alt="logo"
                  className="w-[160px] h-[80px] lg:ml-[180px] ml-[60px] mt-3"
                />
            </div>
          </div>
        </div>
      )}
  </div>
  );
}
