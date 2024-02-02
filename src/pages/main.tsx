import Image from "next/image";
import Link from "next/link";
import bg from '../../public/property.jpg'
import logo from '../../public/logo.png'
import { useQuery, useQueryClient } from "react-query";
import LoginPage from "./login";
import { useLogout } from "./api/auth";


export default function Main() {
    const queryClient = useQueryClient();
    const { data: authToken } = useQuery("authToken", () =>
    queryClient.getQueryData("authToken")
  );

  const logout = useLogout();

  const handleLogout = () => {
    logout;
  };
  return (
    <div>
        {authToken ? (
            <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
                <div className="absolute -z-10 w-full min-h-screen">
                    <Image
                    src={bg}
                    alt="background"
                    className="opacity-70 scale-[2.0]"
                    />
                </div>
                <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700 my-3">Hello, </h1>
                <Link
                    href="/login"
                >
                    <button
                    onClick={handleLogout} 
                    className="w-full px-4 py-2 my-4 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                        Logout
                    </button>
                </Link>
                <Image 
                    src={logo}
                    alt="logo"
                    className="w-[160px] h-[80px] ml-[180px] mt-3"
                />
                </div>
            </div>
        ) : (
            <LoginPage/>
        )}
  </div>
  );
}
