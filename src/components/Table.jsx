import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";
import TablePagination from "./TablePagination";
import usePagination from "../hooks/usePagination";
import style from "./table.css";

function Table(props) {
  const { data, fields, rows } = props;
  const [pageData, setPageData] = useState([]);

  const pagination = usePagination({
    data,
    rowsPerPage: rows,
  });

  useEffect(() => {
    setPageData(pagination.sliceData());
  }, []);

  useEffect(() => {
    setPageData(pagination.sliceData());
  }, [pagination.currentPage]);

  return (
    <>
      <div className="grid w-full overflow-x-auto">
        <div className="flex flex-col w-full">
          <div
            className="grid  font-semibold px-2 rounded-md bg-gray-200 h-[52px]"
            style={{
              gridTemplateColumns: `repeat(${fields.length}, 1fr)`,
            }}
          >
            {fields.map((field, index) => (
              <div
                className="flex items-center h-full text-[12px]  text-nowrap"
                key={field + index}
              >
                {field}
              </div>
            ))}
          </div>

          <div className="flex flex-col w-full">
            {pageData.map((item, index) => (
              <TableRow item={item} key={index} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <TablePagination {...pagination} />
      </div>
    </>
  );
}

export default Table;
