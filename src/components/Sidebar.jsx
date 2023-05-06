import { useState } from "react";

const LinkBar = (props) => {
  return (
    <a
      href={props.link || "#"}
      className="flex justify-start items-center w-full rounded-sm bg-black/10 h-[40px] px-2 cursor-pointer"
    >
      <div className="bg-gray-500/20 rounded-md w-[32px] h-[32px]">
        <img src={props.url || "./logo.png"} alt="" />
      </div>
      <span className="text-white ml-4" href="">
        {props.name || "Link"}
      </span>
    </a>
  );
};

const Bar = (props) => {
  return (
    <div className="flex flex-col gap-4 w-[260px] h-screen bg-[#444A60] pt-[46px]">
      <div className="flex flex-col w-full h-[60%] py-4 px-4 gap-1">
        <LinkBar name="Contactos" url="./logo.png" />
        <LinkBar name="Cuentas" url="./logo.png" />
        <LinkBar name="Posibles clientes" url="./logo.png" />
        <LinkBar name="Tareas " url="./logo.png" />
        <LinkBar name="Tratos" url="./logo.png" />
        <LinkBar name="Dashboard" url="./logo.png" />
      </div>
      <div className="flex justify-center flex-wrap items-center gap-[8px] w-full h-[40%] overflow-hidden py-4 px-2">
        <div className="w-[40%] h-[50px] bg-gray-400/20 rounded-md"></div>
        <div className="w-[40%] h-[50px] bg-gray-400/20 rounded-md"></div>
        <div className="w-[40%] h-[50px] bg-gray-400/20 rounded-md"></div>
        <div className="w-[40%] h-[50px] bg-gray-400/20 rounded-md"></div>
        <div className="w-[40%] h-[50px] bg-gray-400/20 rounded-md"></div>
        <div className="w-[40%] h-[50px] bg-gray-400/20 rounded-md"></div>
      </div>
      <button
        className="flex justify-center items-center bg-white h-[40px] w-[18px] absolute top-[50%]  -right-[18px] rounded-r-[4px] "
        onClick={props.handleOpen}
      >
        <span>|</span>
      </button>
    </div>
  );
};

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {isOpen ? (
        <div className="-translate-x-[260px] sm:-translate-x-[210px]  transition duration-200 ease-in-out">
          <Bar handleOpen={handleOpen} />
        </div>
      ) : (
        <div className="translate-x-[0px]   transition duration-200 ease-in-out">
          <Bar handleOpen={handleOpen} />
        </div>
      )}
    </>
  );
}

export default Sidebar;
