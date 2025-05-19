import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "./Modal";
import { BiGift, BiGroup } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { RiComputerLine } from "react-icons/ri";

const links = {
  "pizquitolearn@yahoo.com":
    "https://accounts.zoho.eu/signin?servicename=ZohoOne&newtheme=true&serviceurl=https%3A%2F%2Fone.zoho.eu%2Fzohoone%2Fpizquito147%2Fhome%2Fcxapp%2Fcrm%2Forg20090852553%2Ftab%2FHome%2Fbegin&signupurl=https%3A%2F%2Fwww.zoho.eu%2Fone%2Fsignup.html",
  "techpropertiescrm@mail.com":
    "https://accounts.zoho.eu/signin?servicename=ZohoOne&newtheme=true&serviceurl=https%3A%2F%2Fone.zoho.eu%2Fzohoone%2Ftechproperties%2Fhome%2Fcxapp%2Fcrm%2Forg20090932902%2Ftab%2FHome%2Fbegin&signupurl=https%3A%2F%2Fwww.zoho.eu%2Fone%2Fsignup.html",
  "uprealsales@mail.com":
    "https://accounts.zoho.eu/signin?service_language=es&servicename=ZohoCRM&signupurl=https://www.zoho.com/es-xl/crm/signup.html&serviceurl=https%3A%2F%2Fcrm.zoho.com%2Fcrm%2FShowHomePage.do%3Fref_value%3D%252C%252C%252CDesktop%252Chttps%253A%252F%252Fwww.zoho.com%252Fes-xl%252Fcrm%252F",
  "antaradevelopers@yahoo.com":
    "https://accounts.zoho.eu/signin?servicename=ZohoOne&newtheme=true&serviceurl=https%3A%2F%2Fone.zoho.eu%2Fzohoone%2Fantara%2Fhome%2Fcxapp%2Fcrm%2Forg20088012946%2Ftab%2FHome%2Fbegin&signupurl=https%3A%2F%2Fwww.zoho.eu%2Fone%2Fsignup.html",
};

const Dropdown = (props) => {
  return (
    <div className=" h-screen w-[380px] shadow-xl z-10 ">
      <div className="flex flex-wrap items-center  w-full h-[38%] bg-gradient-to-b from-[#2A4564] to-[#141E30] py-[20px] px-6 ">
        <div className="flex justify-center items-center w-[24%] h-[80px]">
          <div className="flex justify-center items-center h-[70px] w-[70px] bg-slate-400 rounded-[50%] overflow-hidden border border-gray-500 ">
            {props.user.photoURL ? (
              <img src={props.user.photoURL} />
            ) : (
              <p className="text-3xl text-slate-300 font-semibold">US</p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-[76%] h-[90px] pl-3">
          <h4 className="font-semibold mt-2 mb-[2px] text-white">
            {props.user.displayName || "USER"}
          </h4>
          <p className="text-[12px] text-gray-300">
            ID de usuario: {props.user.metadata.createdAt}
          </p>
          <p className="text-[12px] text-gray-200">{props.user.email}</p>
        </div>
        <div className="w-full">
          <button className="w-[50%]"> </button>
          <button
            className="w-[50%] h-[30px] text-right text-[#F48895] text-sm"
            onClick={props.handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
        <button
          onClick={props.handleOpen}
          className="absolute top-5 right-4 w-[24px] h-[24px] rounded-full hover:bg-slate-50/20 p-[7px] border border-white/30"
        >
          <img src="./nav/close.png" />
        </button>
      </div>

      <div className="flex flex-col justify-between gap-[1px] bg-[#EAEAEA] h-[62%] text-sm text-gray-600 ">
        <div className="flex flex-col items-start justify-center px-[25px] w-full h-[38%] bg-white  text-gray-600 text-[12px]">
          <h4 className="font-bold mb-1">SUSCRIPCIÓN</h4>
          <div className="flex justify-between mb-1 w-full">
            <p className="w-[70%]">Plan Enterprise</p>
            <p className="w-[20%]">
              <p className="hidden text-blue-400 w-full text-right cursor-pointer">
                ACTUALIZAR
              </p>
            </p>
          </div>
          <p className="text-gray-300">Volver a la versión Gratuita</p>
        </div>

        <div className="flex flex-col gap-4 relative h-[62%] bg-white px-[25px] py-[15px] text-[12px]">
          <div className="w-full flex flex-wrap h-[58px]">
            <h4 className="w-full font-bold mt-2 h-[14px]">¿NECESITA AYUDA?</h4>
            <div className="w-[50%] flex items-center">
              <AiOutlineMail className="text-[14px] cursor-pointer" />
              <p className="ml-1 cursor-pointer">Escribanos</p>
            </div>
            <div className="w-[50%] flex items-center">
              <RiComputerLine className="text-[14px] cursor-pointer" />
              <p className="ml-1 cursor-pointer">Recursos {">"} </p>
            </div>
          </div>

          <div className="w-full flex flex-wrap h-[58px]">
            <h4 className="w-full font-bold mt-2 h-[14px]">
              SECCIÓN DE NOTICIAS
            </h4>
            <div className="w-[50%] flex items-center">
              <BiGift className="text-[14px] cursor-pointer" />
              <p className="ml-1 cursor-pointer">Novedades</p>
            </div>
            <div className="w-[50%] flex items-center">
              <BiGroup className="text-[14px] cursor-pointer" />
              <p className="ml-1 cursor-pointer">Comunidad</p>
            </div>
          </div>
          <div className=" absolute bottom-4 text-center text-[12px] text-gray-400">
            Zafir Corporation, © 2022. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </div>
  );
};

//
const Notification = () => {
  return (
    <div className="relative h-screen w-[380px] shadow-lg z-10">
      <div className=""></div>
    </div>
  );
};

function Navbar() {
  const { user, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleNotification = () => {
    setIsNotification(!isNotification);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed left-0 top-0 w-full h-[50px] bg-[#F4F4F4] border border-b-[#c1c1c1] pl-[25px] z-50">
      <div className="flex justify-between items-center text-gray-800">
        <a href="/" className="flex items-end">
          <h1 className="text-xl font-bold">ZAFIR</h1>
          <span className="hidden sm:flex text-[10px] ml-2 mb-[3px]">
            Powered by zoho
          </span>
        </a>
        <div className="flex justify-between flex-row items-center h-[48px] gap-r-4">
          <div className="flex justify-center items-center">
            <Modal
              btn={
                <div className="h-[32px] flex items-center text-sm justify-center w-[100%] bg-white text-[#ef5364] cursor-pointer px-6 rounded-full border hover:border-[#c1c1c1]">
                  Entradas CRM
                </div>
              }
            >
              <div className=" flex flex-wrap justify-center">
                <h2 className="w-full text-center font-bold text-xl mb-4 text-[#666] ">
                  Notificación
                </h2>
                <p className="text-[14px] mb-2 text-[#627282] text-left w-[80%]">
                  Por su seguridad se le pediria que vuelva a iniciar sesion en
                  Zoho CRM
                </p>

                <ul className="flex flex-col text-[14px] text-[#627282] mb-8 w-[80%]">
                  <p className=" font-medium">Para continuar</p>
                  <li>◉ Introducir su usuario y contraseña.</li>
                  <li>◉ Seleccionar zoho CRM como su aplicaión.</li>
                </ul>
                <br />
                <a
                  className="flex justify-center items-center mb-8 w-[80%] h-[38px] bg-[#1991eb] hover:bg-[#4994eb] text-white rounded-sm"
                  href={links[user.email]}
                  target="_blank"
                >
                  Continuar
                </a>
              </div>
            </Modal>

            <button
              onClick={handleNotification}
              className="text-[26px] p-1 text-[#627282]/60 hover:text-[#627282] ml-4 mr-2"
            >
              <IoIosNotificationsOutline />
            </button>
            {isNotification ? (
              <div className="fixed top-[46px] right-[2px] w-[98%] sm:w-[360px] h-[91.8%]  bg-white shadow-xl border border-[#c1c1c1] duration-200">
                <div className="flex justify-between items-center px-4 w-full h-[48px] border-b border-b-[#c1c1c1] bg-[#EAEAEA]">
                  <div className="">
                    <IoIosNotificationsOutline className="text-xl text-[#627282]" />
                  </div>
                  <button className="" onClick={handleNotification}>
                    <IoCloseSharp className="text-xl text-[#627282]" />
                  </button>
                </div>
                <div className="flex justify-center items-center px-2 w-full h-[48px] border-b border-b-[#c1c1c1] bg-[#EAEAEA]">
                  <h4>Notificaciones</h4>
                </div>
                <div className="flex justify-center items-center h-[60px] w-full text-[14px]">
                  Nada aquí.
                </div>
              </div>
            ) : null}
          </div>
          <div className="px-3">
            <button
              onClick={() => {
                if (handleNotification) {
                  setIsNotification(false);
                  handleOpen();
                } else {
                  handleOpen();
                }
              }}
              className="flex justify-center items-center cursor h-[32px] w-[32px] bg-gray-400 hover:bg-gray-300 rounded-[20px] overflow-hidden transition duration-150 ease-in-out"
            >
              {user.photoURL ? (
                <img src={user.photoURL} />
              ) : (
                <p className=" text-slate-300 font-semibold">US</p>
              )}
            </button>
            {isOpen ? (
              <div className="fixed top-[0px] right-0 translate-x-[1px] sm:translate-x-[0px] transition duration-200 ease-in-out">
                <Dropdown
                  handleOpen={handleOpen}
                  user={user}
                  handleLogout={handleLogout}
                />
              </div>
            ) : (
              <div className="fixed top-[0px] right-0 translate-x-[100%]  sm:translate-x-[380px] transition duration-200 ease-in-out">
                <Dropdown
                  handleOpen={handleOpen}
                  user={user}
                  handleLogout={handleLogout}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
