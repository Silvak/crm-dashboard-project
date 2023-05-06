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
      <table className="table w-full rounded-lg border-separate border-spacing-y-0 text-sm">
        <thead className="">
          <tr className="text-center h-[32px]">
            {fields.map((field, index) => (
              <th className="text-[12px]" key={index}>
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={style.tr}>
          {pageData.map((item, index) => (
            <TableRow item={item} key={index} />
          ))}
        </tbody>
      </table>
      <div className="my-6">
        <TablePagination {...pagination} />
      </div>
    </>
  );
}

export default Table;
