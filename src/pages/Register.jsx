import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

//
function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        setError("Correo electrónico ya en uso");
      }
      if (error.code === "auth/invalid-email") {
        setError("Correo electrónico inválido");
      }
      if (error.code === "auth/weak-password") {
        setError("Contraseña débil");
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
      setError("");
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
      <div className="px-[8%] pt-[8%] pb-[10%]  bg-white w-screen h-screen  sm:w-[480px] sm:h-auto">
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
            <h4 className="text-lg font-bold">Registrate</h4>
          </div>

          <div className="flex flex-col   mb-2">
            <label htmlFor="email" className="text-sm text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="youremail@company.ltd"
              onChange={handleChange}
              className="bg-[#F8F8F8] rounded-sm h-[40px] w-full px-[8px] py-[1px]"
            />
          </div>

          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="text-sm text-gray-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              className="bg-[#F8F8F8] rounded-sm h-[40px] w-full px-[8px] py-[1px]"
            />
          </div>

          <div className="flex items-center w-full mb-6">
            <input type="checkbox" name="checkbox" className="mr-2" />
            <label htmlFor="checkbox" className="text-[10px] text-gray-500">
              Estoy de acuerdo con los Términos de servicio y la Política de
              privacidad.
            </label>
          </div>

          <button
            className="bg-[#F0483E] text-white w-full h-[40px] rounded-sm"
            type="submit"
          >
            Register
          </button>

          <div className="flex justify-between items-center text-sm  text-gray-500 w-full mt-4">
            {" "}
            O inicie sesión usando
            <button
              className="bg-gray-400 text-white h-[40px] w-[50%] sm:w-[55%] rounded-sm shadow-md"
              onClick={handleGoogleSignin}
            >
              Google
            </button>
          </div>

          <div className="flex flex-col items-center mt-8 sm:hidden">
            <p className="text-sm text-center text-gray-500">
              ¿Tiene cuenta?{" "}
              <a className="text-[#159AFF]" href="/login">
                Inicia sesión
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
          ¿Tiene cuenta?{" "}
          <a className="text-[#159AFF]" href="/login">
            Inicia sesión
          </a>{" "}
        </p>
        <p className="text-[14px] sm:text-sm text-center text-gray-500 mt-1">
          Zafir Corporation, © 2022. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}

export default Register;
