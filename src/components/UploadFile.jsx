import React, { useRef, useState } from "react";
import { useCSVReader } from "react-papaparse";
import useLocalStorage from "../hooks/useLocalStorage";
import { FiSearch } from "react-icons/fi";
import { AiOutlineUpload } from "react-icons/ai";
import { useAuth } from "../context/authContext";

//upload file
import { uploadFile } from "../firebase.js";
import csvToJson from "csvtojson";

const styles = {
  acceptedFile: {
    border: "1px solid #ccc",
    height: 40,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "20%",
  },
  remove: {
    borderRadius: 0,
    padding: "0 20px",
  },
  progressBarBackgroundColor: {
    backgroundColor: "#E6E6E6",
  },
};

function UploadFile() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Clientes");
  const { user } = useAuth();
  const [notificacion, setNotification] = useState(" ");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const json = await csvToJson().fromFile(file);
    //const jsonString = JSON.stringify(json, null, 2);
    //console.log(jsonString);

    try {
      const result = await uploadFile(file, user.uid, `${fileName}.json`);
      console.log(result);
      if (result.metadata.contentType === "text/json") {
        //console.log("File uploaded successfully");
        setNotification("El archivo se subió exitosamente.");
        setTimeout(() => {
          setNotification(" ");
        }, 4500);
      }

      //console.log(result.metadata);
    } catch (error) {
      console.log(error);
      setNotification("Error al tratar de subir el archivo.");
      setTimeout(() => {
        setNotification(" ");
      }, 4500);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="sm:col-span-4 bg-white rounded-[5px] px-[20px] py-[15px] border border-gray-300 shadow-sm border-l-4 border-l-[#f47b87]">
          <h3 className="text-2xl w-full text-gray-500">Subir datos</h3>
        </div>
        <div className="sm:col-span-4 bg-white rounded-[5px] px-[20px] py-[15px] border border-gray-300 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <h3 className="text-xl w-full text-center mb-0 text-gray-500">
              Seleccione un archivo
            </h3>

            <div className="w-full text-center mt-3 mb-4 text-[14px] h-[16px] text-gray-400">
              {notificacion}
            </div>

            <input
              type="file"
              name=""
              id=""
              accept=".json"
              className="cursor-pointer w-full h-auto bg-gray-100 text-sm rounded-sm"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="w-full text-left text-[12px] mt-4 mb-1 text-gray-500">
              Tipo de archivo
            </label>
            <select
              name="color"
              required
              className="w-full h-[40px] bg-gray-100 rounded-sm px-2 text-sm"
              onChange={(e) => setFileName(e.target.value)}
            >
              <option>Clientes</option>
              <option>Facturas</option>
              <option>Tratos</option>
              <option>Presupuestos</option>
              <option>Posibles_clientes</option>
            </select>
            <button
              type="submit"
              className="w-full h-[40px] bg-blue-500 text-white rounded-sm mt-8 mb-2"
            >
              Subir
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

/*
function UploadFile() {
  const { CSVReader } = useCSVReader();
  const buttonRef = useRef(null);
  const [data, setData] = useLocalStorage("data", []);

  const handleOnFileLoad = (data) => {
    console.log(data);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleFileRemove = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="sm:col-span-4 bg-white rounded-[5px] px-[20px] py-[15px] border border-gray-300 shadow-sm border-l-4 border-l-[#f47b87]">
          <h3 className="text-2xl w-full text-gray-500">Upload</h3>
        </div>
        <div className="sm:col-span-4 bg-white rounded-[5px] px-[20px] py-[15px] border border-gray-300 shadow-sm">
          <CSVReader
            onUploadAccepted={(results) => {
              console.log("---------------------------");
              console.log(results);
              setData(results);
              console.log("---------------------------");
            }}
          >
            {({
              getRootProps,
              acceptedFile,
              ProgressBar,
              getRemoveFileProps,
            }) => (
              <>
                <div className="flex justify-center items-center flex-wrap">
                  <h3 className="text-xl w-full text-gray-500 text-center mb-8">
                    Sube tu archivo csv
                  </h3>
                  <div className="flex flex-col w-full sm:max-w-[400px] gap-3 mb-3">
                    <div className=" flex items-center  justify-center border text-sm text-gray-500 border-gray-300 h-[40px] rounded-sm">
                      {acceptedFile && acceptedFile.name}
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <button
                        type="button"
                        {...getRootProps()}
                        className="flex  justify-center items-center w-[50%] h-[40px] bg-blue-500 hover:bg-blue-600 text-white texxt-sm font-bold py-2 px-4 rounded-sm"
                      >
                        <AiOutlineUpload className="text-xl font-bold " />
                      </button>

                      <button
                        {...getRemoveFileProps()}
                        className="flex  justify-center items-center w-[50%] h-[40px] bg-red-400 hover:bg-red-500 text-white text-sm py-2 px-4 rounded-sm"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
                <ProgressBar style={styles.progressBarBackgroundColor} />
              </>
            )}
          </CSVReader>
        </div>
      </div>
    </>
  );
}
*/

export default UploadFile;

/*

 <>
      <div className="">
        <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          onClick
          noDrag
          onRemoveFile={handleFileRemove}
        ></CSVReader>
      </div>
    </>



<div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-4 bg-white rounded-sm px-[20px] py-[15px] border border-gray-300 shadow-md">
          <h3 className="text-2xl w-full text-gray-500">Subir csv</h3>
        </div>
        <div className="sm:col-span-4 bg-white rounded-sm px-[20px] py-[15px] border border-gray-300 shadow-md">
          <h3 className="text-2xl w-full text-gray-500">Upload json</h3>
          <form action="">
            <input type="file" />
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
*/
