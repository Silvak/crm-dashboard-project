import React from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

//
const TablePagination = ({ backPage, nextPage, currentPage, totalPages }) => {
  return (
    <div className="flex justify-center items-center gap-4 w-[100%] h-[40px] mt-4 rounded-lg ">
      <button
        onClick={backPage}
        className="flex justify-center items-center bg-[#627282]/60 text-white  text-lg w-[24px] h-[24px] rounded-sm"
      >
        <MdArrowLeft />
      </button>
      <div className="text-sm  text-gray-500">
        {currentPage} de {totalPages}
      </div>
      <button
        onClick={nextPage}
        className="flex justify-center items-center bg-[#627282]/60 text-white  text-lg w-[24px] h-[24px] rounded-sm"
      >
        <MdArrowRight />
      </button>
    </div>
  );
};

export default TablePagination;
