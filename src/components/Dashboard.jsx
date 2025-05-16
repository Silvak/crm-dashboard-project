import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DashDoughnut from "./DashDoughnut";
import Table from "../components/Table";
import LineChart from "./LineChart";
import useLocalStorage from "../hooks/useLocalStorage";
import myDataFilter from "../hooks/useFilter";
import dataZoho from "../data/dataZoho.json";
import dataInvoices from "../data/invoices.json";
import { useAuth } from "../context/authContext";
import useGetData from "../hooks/useGetData";
import Loading from "./Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

//###############################################################################
const TablePedidos = (props) => {
  const { fieldFilter, dataFilter } = props.dataFilter;

  return (
    <div className="sm:col-span-4 lg:col-span-2 bg-white rounded-[5px] p-4 border border-gray-300 shadow-sm">
      <h3 className="text-xl w-full text-center mb-4 text-gray-500">
        Tratos con clientes{" "}
      </h3>
      <div className=" w-[100%] mt-4">
        <Table
          fields={fieldFilter([7, 19])}
          rows={4}
          data={dataFilter([7, 19])}
        />
      </div>
    </div>
  );
};

//###############################################################################
const TableFacutras = (props) => {
  const { fieldFilter, dataFilter } = props.dataFilter;

  return (
    <div className="sm:col-span-4 lg:col-span-2 bg-white rounded-[5px] p-4 border border-gray-300 shadow-sm">
      <h3 className="text-xl w-full text-center mb-4 text-gray-500">
        Presupuestos
      </h3>
      <div className=" w-[100%] mt-4">
        <Table
          fields={fieldFilter([3, 16])}
          rows={4}
          data={dataFilter([3, 16])}
        />
      </div>
    </div>
  );
};

//###############################################################################
const Pie = (props) => {
  //const { repetAmounts } = props.dataFilter;
  //console.log(props.dataFilter);
  return <DashDoughnut data={props.dataFilter} />;
};

//
//#############################   DASHBOARD ###########################
function Dashboard() {
  const [dataClients, setDataClients] = useState([]);
  const [dataInvoicesD, setDataInvoicesD] = useState([]);
  const [dataFacturas, setDataFacturas] = useState([]);
  const [posiblesClientes, setPosiblesClientes] = useState([]);

  const { getDataJson } = useGetData();
  //Posibles_clientes

  const getPosiblesClientes = async () => {
    let json = await getDataJson("Posibles_clientes.json");
    setPosiblesClientes(json);
  };

  const getFacturas = async () => {
    let json = await getDataJson("Clientes.json");
    setDataFacturas(json);
  };

  const getTratos = async () => {
    let json = await getDataJson("Tratos.json");
    setDataClients(json);
  };

  const getInvoices = async () => {
    let json = await getDataJson("Presupuestos.json");
    setDataInvoicesD(json);
  };

  useEffect(() => {
    getTratos();
    getInvoices();
    getFacturas();
    getPosiblesClientes();
  }, []);

  let a = 0;
  dataClients.forEach((item) => {
    const probabilidad = parseFloat(item["Probabilidad (%)"]);
    if (!isNaN(probabilidad)) {
      a += probabilidad;
    }
  });

  //promedio
  let b = 0.0;
  dataClients.map((item) => {
    const probabilidad = parseFloat(item["Importe"]);
    if (!isNaN(probabilidad)) {
      b += probabilidad;
    }
  });

  let dataPie = [];
  posiblesClientes.map((item) => {
    if (item["Fuente de Posible cliente"] !== "") {
      dataPie.push(item["Fuente de Posible cliente"]);
    } else {
      dataPie.push("Otros");
    }
  });
  //console.log(dataPie);

  const dataFilteredPie = dataPie.reduce((obj, val) => {
    if (obj.hasOwnProperty(val)) {
      obj[val]++;
    } else {
      obj[val] = 1;
    }
    return obj;
  }, {});

  //const { fieldFilter, dataFilter, graphFilter } = myDataFilter(dataInvoicesD);

  if (dataClients.length === 0 || dataInvoicesD.length === 0) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
      <div className="sm:col-span-4 bg-white rounded-[5px] px-[20px] py-[15px] border border-gray-300 shadow-sm border-l-4 border-l-[#f47b87]">
        <h3 className="text-2xl w-full text-gray-500">Tablero</h3>
      </div>

      <div className="flex items-baseline sm:col-span-4  rounded-[5px]  pt-4 ">
        <h3 className="text-lg w-full text-gray-500">Estadisticas</h3>
      </div>

      <div className="flex justify-start items-center sm:col-span-2 lg:col-span-1 bg-white rounded-[5px] px-[20px] py-[15px] border border-gray-300 shadow-sm border-l-4 border-l-[#ff9526] overflow-hidden">
        <h4 className="text-sm w-full text-gray-500">Potenciales</h4>
        <p className="text-xl font-bold text-gray-600 ">
          {dataInvoicesD.length}
        </p>
      </div>

      <div className="flex justify-start items-center sm:col-span-2 lg:col-span-1 bg-white rounded-[5px] px-[20px] py-[15px] border border-gray-300 shadow-sm border-l-4 border-l-[#1991eb] overflow-hidden">
        <h4 className="text-sm w-full text-gray-500">Conversión</h4>
        <p className="text-xl font-bold text-gray-600 ">
          {(a / dataClients.length).toFixed(2)}%
        </p>
      </div>

      <div className="flex justify-start items-center sm:col-span-2 lg:col-span-1 bg-white rounded-[5px] px-[20px] py-[15px] border border-gray-300 shadow-sm border-l-4 border-l-[#627282] overflow-hidden">
        <h4 className="text-sm w-full text-gray-500">
          Promedio <strong>n</strong>
        </h4>
        <p className="text-xl font-bold text-gray-600 ">
          €{(b / dataClients.length).toFixed(2)}
        </p>
      </div>

      <div className="flex justify-start items-center sm:col-span-2 lg:col-span-1 bg-white rounded-[5px] px-[20px] py-[15px] border border-gray-300 shadow-sm border-l-4 border-l-[#14b474] overflow-hidden">
        <h4 className="text-sm w-full text-gray-500">Facturados</h4>
        <p className="text-xl font-bold text-gray-600 ">{dataClients.length}</p>
      </div>

      <TablePedidos dataFilter={myDataFilter(dataInvoicesD)} />
      <TableFacutras dataFilter={myDataFilter(dataClients)} />

      <div className="sm:col-span-4 bg-white rounded-[5px] px-[20px] py-[15px] border border-gray-300 shadow-sm">
        <h3 className="text-xl w-full text-center text-gray-500">
          Grafica - ventas
        </h3>
        <div className="flex justify-center w-[100%] mt-4">
          <LineChart data={dataInvoicesD} data2={dataClients} />
        </div>
      </div>

      <div className="sm:col-span-4 bg-white rounded-[5px] px-[20px] py-[15px] border border-gray-300 shadow-sm">
        <h3 className="text-xl w-full text-center text-gray-500">
          Posibles clientes por origen
        </h3>
        <div className="flex justify-center w-[100%] h-[480px] py-2 mt-4">
          <Pie dataFilter={dataFilteredPie} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
