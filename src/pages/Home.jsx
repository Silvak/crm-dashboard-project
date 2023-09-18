import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/authContext";
import Loading from "../components/Loading";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { v4 } from "uuid";
import Renewal from "../components/Renewal";

//
import { BsArrowLeftShort, BsBorderAll, BsChevronDown } from "react-icons/bs";
import {
  AiOutlineHome,
  AiOutlineTable,
  AiOutlineReconciliation,
} from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { RiFileUploadFill } from "react-icons/ri";
import { RiTableFill } from "react-icons/ri";
import { AiFillProject } from "react-icons/ai";
import { IoMdArrowDropleft } from "react-icons/io";

//
export const Menus = [
  { title: "Tablero", icon: <MdDashboard />, url: "dashboard" },
  { title: "Datos", icon: <RiTableFill />, url: "table" },
  //{ title: "Cargar", icon: <RiFileUploadFill />, url: "upload" }, // <<<<<<<<<<<<<<<<<
  //{ title: "Cuentas", icon: <BsBorderAll />, spacing: true },
  /*
  {
    title: "Proyectos",
    icon: <AiFillProject />,
    url: "project",
    submenu: false,
    submenuItems: [
      { title: "Proyecto One", url: "dashboard" },
      { title: "Proyecto Two", url: "dashboard" },
    ],
  },*/
];

//
function Home() {
  const [open, setOpen] = useState(true);
  const { user, logout, loading } = useAuth();
  const [submenuOpen, setSubmenuOpen] = useState(false);

  //
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmenuOpen = () => {
    setSubmenuOpen(!submenuOpen);
  };

  if (loading) {
    return <Loading />;
  } //
  return (
    <>
      <Navbar />
      {/* <Renewal />  */}
      <div className="flex">
        <div
          className={`fixed sm:relative bg-gradient-to-b from-[#2A4564] to-[#141E30] shadow-lg   ${
            open ? "w-72 min-w-[260px]" : "w-14 min-w-[56px]"
          } h-screen p-2 pt-10 duration-200 z-40`}
        >
          <IoMdArrowDropleft
            onClick={handleOpen}
            className={`${
              !open ? "rotate-180 rounded-l-[3px]" : "rounded-r-[3px]"
            }  absolute  h-[32px]  w-[12px] -right-[12px] -mt-[20px] top-[50%] bg-white text-[#BBB]  text-2xl border cursor-pointer border-[#BBB] `}
          />
          <div className="flex h-[16px] w-full"> </div>
          <ul className="pt-2">
            {Menus.map((menu, index) => (
              <>
                <Link to={menu.url}>
                  <li
                    key={v4()}
                    className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer py-2  rounded-sm mt-2 duration-75
                  ${menu.spacing ? "mt-9" : "mt-1"}  ${
                      currentPath === menu.url
                        ? "bg-[#EAEAEA] shadow-md hover:bg-ineherit"
                        : "hover:bg-black/20 "
                    }`}
                  >
                    <span
                      className={`text-2xl  px-1  ${
                        currentPath === menu.url && "text-[#ED696B]"
                      }   ${
                        currentPath === menu.url && open
                          ? `border-l-[4px] border-l-[#ED696B]`
                          : "text-white border-l-[4px] border-l-[#1E2F4700]"
                      }`}
                    >
                      {menu.icon ? menu.icon : <BsBorderAll />}
                    </span>
                    <span
                      className={` font-lg flex-1 text-sm ${
                        !open && "hidden"
                      } duration-200 ${
                        currentPath === menu.url
                          ? "text-[#1E2F47]"
                          : "text-white"
                      }`}
                    >
                      {menu.title}
                    </span>
                    {menu.submenu && open && (
                      <BsChevronDown
                        className={`${submenuOpen && "rotate-180"} duration-50`}
                        onClick={handleSubmenuOpen}
                      />
                    )}
                  </li>
                </Link>

                {menu.submenu && submenuOpen && open && (
                  <ul>
                    {menu.submenuItems.map((submenu, index) => (
                      <li
                        key={v4()}
                        className="text-gray-300 h-[50px] text-sm flex items-center gap-x-4 cursor-pointer py-2 px-4 hover:bg-black/20 active:bg-black/50 mt-2"
                      >
                        {submenu.title}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
          <div
            className={`absolute bottom-2 left-0 flex flex-col  w-full place-content-center px-4  pb-2 duration-300 ease-in-out overflow-hidden ${
              !open && "px-2 "
            }`}
          >
            <div
              className={`flex flex-col gap-1 overflow-hidden  justify-center w-full
            `}
            >
              <div
                className={`bg-white h-[78px] rounded-sm  pt-1 pb-2 object-cover overflow-hidden ${
                  !open && " min-w-[40px] bg-[#294361]"
                }`}
              >
                <img
                  src="./logos/aFondo_Europeo.jpg"
                  alt=""
                  className={`object-scale-down w-[100%] h-[100%] ${
                    !open && "hidden"
                  }`}
                />
              </div>
              <div
                className={`bg-white h-[78px] rounded-sm  py-2 object-cover overflow-hidden ${
                  !open && " min-w-[40px] bg-[#294361]"
                }`}
              >
                <img
                  src="./logos/alogo_canarias_avanza.png"
                  alt=""
                  className={`object-scale-down w-[100%] h-[100%] ${
                    !open && "hidden"
                  }`}
                />
              </div>
              <div
                className={`bg-white h-[154px] rounded-sm  p-2 pb-3 pt-2 object-cover overflow-hidden ${
                  !open && " min-w-[40px] bg-[#294361]"
                }`}
              >
                <img
                  src={"./logos/alogo_gobcan.jpg"}
                  alt=""
                  className={`object-scale-down w-[100%] h-[100%] ${
                    !open && "hidden"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="fixed  sm:relative h-screen w-[100%]  pl-[72px] pr-4 sm:px-[30px]  pt-[78px] pb-[30px] overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Home;
