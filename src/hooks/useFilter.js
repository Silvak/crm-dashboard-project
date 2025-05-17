import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

//
const useFilter = (data) => {
  const fieldFilter = (fieldNumber) => {
    // this function return an array of fields that you want
    let listOfKeys = Object.keys(data[0]);
    let fieldFiltered = [];
    fieldNumber.map((item) => {
      fieldFiltered.push(listOfKeys[item]);
    });
    return fieldFiltered; // ["a", "b", ...]
  };

  const dataFilter = (fieldNumber) => {
    if (!data || data.length === 0) return [];

    const listOfKeys = Object.keys(data[0]);

    // Detectar todos los campos que son válidos como fecha
    const dateFields = listOfKeys.filter((key) => {
      const sampleValue = data[0][key];
      return (
        typeof sampleValue === "string" &&
        !isNaN(new Date(sampleValue).getTime())
      );
    });

    let sortedData = [...data];

    // Si hay campos de fecha, usar el primero como criterio de orden (descendente)
    if (dateFields.length > 0) {
      const mainDateField = dateFields[0];
      sortedData.sort(
        (a, b) => new Date(b[mainDateField]) - new Date(a[mainDateField])
      );
    }

    // Filtrar y formatear los campos seleccionados
    const dataFiltered = sortedData.map((item) =>
      listOfKeys.reduce((acc, key, index) => {
        if (fieldNumber.includes(index)) {
          let value = item[key];
          // Si el campo es una fecha válida, formatear a solo fecha
          if (dateFields.includes(key)) {
            const parsedDate = new Date(value);
            if (!isNaN(parsedDate.getTime())) {
              value = parsedDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
            }
          }
          acc[key] = value;
        }
        return acc;
      }, {})
    );

    return dataFiltered;
  };

  const graphFilter = (fieldNumber) => {
    let dataFiltered = [];

    data.map((item) => {
      let itemValue = [];
      dataFiltered.push(
        Object.keys(item).reduce((acc, key) => {
          if (fieldNumber.includes(Object.keys(item).indexOf(key))) {
            acc[key] = item[key];
            itemValue = Object.values(acc);
            return itemValue[0];
          }
          return acc;
        }, {})
      );
    });

    return dataFiltered;
  };

  function repetAmountsList() {
    let importe = [];
    for (let i = 0; i < data.length; i++) {
      importe.push(data[i]["Total general"]);
    }
    let repetidos = {};
    importe.forEach(function (numero) {
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });

    return repetidos;
  }

  let repetAmounts = repetAmountsList();

  return {
    fieldFilter,
    dataFilter,
    graphFilter,
    repetAmounts,
  };
};

export default useFilter;
