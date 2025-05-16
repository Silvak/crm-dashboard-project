import React from "react";

const TableRow = ({ item, index }) => {
  const keys = Object.keys(item);
  const isEven = index % 2 === 0;

  return (
    <div
      className={`rounded-md px-2 py-2 text-[12px] w-full  ${
        isEven ? "bg-white" : "bg-gray-100"
      } grid min-h-[52px] gap-1`}
      style={{
        gridTemplateColumns: `repeat(${keys.length}, 1fr)`,
      }}
    >
      {keys.map((key, i) => (
        <div
          key={item[key] + i}
          className="flex items-center min-w-[140px] text-nowrap overflow-hidden"
        >
          <span className="capitalize">{item[key]}</span>
        </div>
      ))}
    </div>
  );
};

export default TableRow;
