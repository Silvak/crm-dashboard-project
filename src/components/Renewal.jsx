import React from "react";
import { useAuth } from "../context/authContext";

function Renewal() {
  const { user, logout, loading } = useAuth();

  return (
    <div className="fixed w-full h-screen bg-[#5773A9]/50 z-[2000] backdrop-blur-xl grid place-content-center">
      <div className="flex flex-col gap-4 bg-white rounded-md shadow-sm p-8 max-w-[340px] md:max-w-[400px]">
        <h2 className="w-full text-center font-bold text-xl mb-1 text-[#666] ">
          Notificación
        </h2>
        <p className="text-[14px] text-[#627282]">
          Sentimos las molestias el usuario y contraseña utilizados eran
          temporales, por motivos de seguridad y para renovar sus credenciales
          de acceso temporal, debe solicitarlo a:
        </p>
        <div className="flex items-center justify-center text-[14px] text-gray-800 w-full bg-gray-100 h-[40px] rounded-sm">
          {user.email}
        </div>

        <button
          onClick={() => logout()}
          className="w-full bg-red-500 h-[40px] mt-2 rounded-sm text-white font-bold text-sm hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Renewal;
