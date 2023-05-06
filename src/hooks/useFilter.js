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
    // this function return an array of objects with the fields that you want
    let dataFiltered = [];
    let listOfKeys = Object.keys(data[0]);
    // sort the array of objects
    data.map((item) => {
      dataFiltered.push(
        Object.keys(item).reduce((acc, key) => {
          if (fieldNumber.includes(Object.keys(item).indexOf(key))) {
            acc[key] = item[key];
          }
          return acc;
        }, {})
      );
    });
    return dataFiltered; // resutl -> [{a: "a", b: "b", ...}]
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
