import React from "react";

const TableRow = ({ item }) => {
  const keys = Object.keys(item);

  return (
    <tr className="h-[32px] text-center text-gray-600">
      {keys.map((key, index) => (
        <td className="text-[12px]" key={index}>
          {item[key]}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
