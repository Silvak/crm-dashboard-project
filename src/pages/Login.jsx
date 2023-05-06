import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

//
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
      if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado");
      }
      if (error.code === "auth/too-many-requests") {
        setError("Demasiadas solicitudes");
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
      if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado");
      }
      if (error.code === "auth/too-many-requests") {
        setError("Demasiadas solicitudes");
      }

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="grid place-content-center w-scree h-screen bg-[url('./login/login-bg.svg')] overflow-x-hidden">
      <div className="px-[8%] py-[8%]  bg-white w-screen h-screen  sm:w-[480px] sm:h-[450px]">
        <form onSubmit={handleSubmit} className="grid">
          <div className="flex w-full">
            <div className="w-[50px] h-[50px] mr-3">
              <img src="./logo.png" alt="logo" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold m-0 p-0">ZAFIR</h1>
              <span className="text-[12px] text-gray-700 text m-0 p-0">
                Powered by zoho
              </span>
            </div>
          </div>

          {error ? (
            <div className="relative my-4">
              <Alert message={error} />
            </div>
          ) : (
            <div className="w-full h-[40px] my-4"></div>
          )}

          <div>
            <h4 className="text-lg font-bold">Iniciar sesión</h4>
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="text-sm text-gray-500">
              correo
            </label>
            <input
              type="email"
              name="email"
              placeholder="youremail@company.ltd"
              onChange={handleChange}
              className="bg-[#F8F8F8] rounded-sm h-[40px] w-full px-[8px] py-[1px]"
            />
          </div>

          <div className="flex flex-col mb-10">
            <label htmlFor="password" className="text-sm text-gray-500">
              contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              className="bg-[#F8F8F8] rounded-sm h-[40px] w-full px-[8px] py-[1px]"
            />
          </div>

          <button
            className="bg-[#159AFF] text-white w-full h-[40px] rounded-sm"
            type="submit"
          >
            Login
          </button>

          <div className="flex flex-col items-center mt-8 sm:hidden">
            <p className="fixed bottom-5 w-[90%] text-[14px] sm:text-sm text-center text-gray-500 mt-4">
              Zafir Corporation, © 2022. Todos los derechos reservados.
            </p>
          </div>
        </form>
      </div>

      <div className="hidden flex-col items-center mt-8 sm:flex">
        <p className="text-[14px] sm:text-sm text-center text-gray-500 mt-1">
          Zafir Corporation, © 2022. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}

export default Login;

/*

import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

//
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
      if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado");
      }
      if (error.code === "auth/too-many-requests") {
        setError("Demasiadas solicitudes");
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
      if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado");
      }
      if (error.code === "auth/too-many-requests") {
        setError("Demasiadas solicitudes");
      }

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="grid place-content-center w-scree h-screen bg-[url('./login/login-bg.svg')] overflow-x-hidden">
      <div className="px-[8%] py-[8%]  bg-white w-screen h-screen  sm:w-[480px] sm:h-[490px]">
        <form onSubmit={handleSubmit} className="grid">
          <div className="flex w-full">
            <div className="w-[50px] h-[50px] mr-3">
              <img src="./logo.png" alt="logo" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold m-0 p-0">ZAFIR</h1>
              <span className="text-[12px] text-gray-700 text m-0 p-0">
                Powered by zoho
              </span>
            </div>
          </div>

          {error ? (
            <div className="relative">
              <Alert message={error} />
            </div>
          ) : (
            <div className="w-full h-[40px]"></div>
          )}

          <div>
            <h4 className="text-lg font-bold">Iniciar sesión</h4>
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="text-sm text-gray-500">
              correo
            </label>
            <input
              type="email"
              name="email"
              placeholder="youremail@company.ltd"
              onChange={handleChange}
              className="bg-[#F8F8F8] rounded-sm h-[40px] w-full px-[8px] py-[1px]"
            />
          </div>

          <div className="flex flex-col mb-10">
            <label htmlFor="password" className="text-sm text-gray-500">
              contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              className="bg-[#F8F8F8] rounded-sm h-[40px] w-full px-[8px] py-[1px]"
            />
          </div>

          <button
            className="bg-[#159AFF] text-white w-full h-[40px] rounded-sm"
            type="submit"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-500 w-full my-3">
            {" "}
            O bien
          </p>

          <button
            className="bg-gray-400 text-white h-[40px] w-full rounded-sm shadow-md"
            onClick={handleGoogleSignin}
          >
            Login con Google
          </button>

          <div className="flex flex-col items-center mt-8 sm:hidden">
            <p className="text-sm text-center text-gray-500">
              ¿No tiene una cuenta?{" "}
              <a className="text-[#159AFF]" href="/register">
                Registrarse ahora
              </a>{" "}
            </p>
            <p className="fixed bottom-5 w-[90%] text-[14px] sm:text-sm text-center text-gray-500 mt-4">
              Zafir Corporation, © 2022. Todos los derechos reservados.
            </p>
          </div>
        </form>
      </div>

      <div className="hidden flex-col items-center mt-8 sm:flex">
        <p className="text-sm text-center text-gray-500">
          ¿No tiene una cuenta?{" "}
          <a className="text-[#159AFF]" href="/register">
            Registrarse ahora
          </a>
        </p>
        <p className="text-[14px] sm:text-sm text-center text-gray-500 mt-1">
          Zafir Corporation, © 2022. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}

*/
