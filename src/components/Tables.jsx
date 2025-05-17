import { useState, useEffect } from "react";
import Table from "../components/Table";
import useLocalStorage from "../hooks/useLocalStorage";
import myDataFilter from "../hooks/useFilter";
import dataZoho from "../data/dataZoho.json";
import dataInvoices from "../data/invoices.json";
import useGetData from "../hooks/useGetData";
import Loading from "./Loading";

const TableInvoices = (props) => {
  const { fieldFilter, dataFilter } = props.dataFilter;
  return (
    <div className="flex flex-col sm:col-span-4 bg-white rounded-[5px] p-4 border border-gray-300 shadow-sm">
      <Table
        fields={fieldFilter([4, 8, 10, 11, 17])}
        rows={10}
        data={dataFilter([4, 8, 10, 11, 17])}
      />
    </div>
  );
};

function Tables() {
  const [dataClients, setDataClients] = useState([]);
  const [dataInvoicesD, setDataInvoicesD] = useState([]);

  const { getDataJson } = useGetData();

  const getClients = async () => {
    let json = await getDataJson("Posibles_clientes.json");
    setDataClients(json);
  };

  const getInvoices = async () => {
    let json = await getDataJson("Tratos.json");

    setDataInvoicesD(json);
  };

  useEffect(() => {
    getClients();
    getInvoices();
  }, []);

  const { fieldFilter, dataFilter } = myDataFilter(dataClients);

  if (dataClients.length === 0 || dataInvoicesD.length === 0) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
      <div className="sm:col-span-4 bg-white rounded-[5px] p-4 border border-gray-300 shadow-sm border-l-4 border-l-[#f47b87]">
        <h3 className="text-2xl w-full text-gray-500">
          Clientes más probables
        </h3>
      </div>

      <div className="flex flex-col sm:col-span-4 bg-white rounded-[5px] p-4 border border-gray-300 shadow-sm">
        <Table
          fields={fieldFilter([2, 3, 8, 24])}
          rows={10}
          data={dataFilter([2, 3, 8, 24])}
        />
      </div>

      <div className="sm:col-span-4 mt-16 bg-white rounded-[5px] p-4 border border-gray-300 shadow-sm border-l-4 border-l-[#f47b87]">
        <h3 className="text-2xl w-full text-gray-500">
          Tratos con conversión más probable
        </h3>
      </div>
      <TableInvoices dataFilter={myDataFilter(dataInvoicesD)} />
    </div>
  );
}

export default Tables;
