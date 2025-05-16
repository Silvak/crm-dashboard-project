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

    // Detectar campo de fecha automáticamente
    const dateField = listOfKeys.find((key) => {
      const sampleValue = data[0][key];
      const date = new Date(sampleValue);
      return !isNaN(date.getTime()); // true si es fecha válida
    });

    let sortedData = [...data];

    // Si se detecta un campo de fecha, ordenar
    if (dateField) {
      sortedData.sort(
        (a, b) => new Date(b[dateField]) - new Date(a[dateField])
      );
    }

    // Filtrar campos seleccionados
    const dataFiltered = sortedData.map((item) =>
      Object.keys(item).reduce((acc, key) => {
        if (fieldNumber.includes(listOfKeys.indexOf(key))) {
          acc[key] = item[key];
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
