import { useEffect } from "react";
import useLocaLStorage from "./useLocalStorage";

const usePagination = ({ data, rowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useLocaLStorage("page", 1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const backPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const sliceData = () => {
    return data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  };

  return {
    backPage,
    nextPage,
    currentPage,
    totalPages,
    sliceData,
  };
};

export default usePagination;
