import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useFilter = (data) => {
  const fieldFilter = (fieldNumber) => {
    let listOfKeys = Object.keys(data[0]);
    return fieldNumber.map((item) => listOfKeys[item]);
  };

  // Generar fechas descendentes desde 2025-05-30 a 2025-02-15
  const generateDescendingDates = (count) => {
    const endDate = new Date("2025-05-30");
    const startDate = new Date("2025-02-15");
    const range = endDate.getTime() - startDate.getTime();
    const step = Math.floor(range / (count - 1));

    return Array.from({ length: count }, (_, i) => {
      const date = new Date(endDate.getTime() - i * step);
      return date.toISOString().split("T")[0]; // YYYY-MM-DD
    });
  };

  const dataFilter = (fieldNumber) => {
    if (!data || data.length === 0) return [];

    const listOfKeys = Object.keys(data[0]);

    // Detectar campos de tipo fecha
    const dateFields = listOfKeys.filter((key) => {
      const sampleValue = data[0][key];
      return (
        typeof sampleValue === "string" &&
        !isNaN(new Date(sampleValue).getTime())
      );
    });

    let sortedData = [...data];

    // Usar el primer campo de fecha para ordenar los datos
    if (dateFields.length > 0) {
      const mainDateField = dateFields[0];
      sortedData.sort(
        (a, b) => new Date(b[mainDateField]) - new Date(a[mainDateField])
      );
    }

    const updatedDates = generateDescendingDates(42);

    const dataFiltered = sortedData.map((item, idx) => {
      const newItem = listOfKeys.reduce((acc, key, index) => {
        if (fieldNumber.includes(index)) {
          let value = item[key];

          if (dateFields.includes(key)) {
            const parsedDate = new Date(value);
            if (!isNaN(parsedDate.getTime())) {
              if (idx < updatedDates.length) {
                value = updatedDates[idx]; // asignar nueva fecha descendente
              } else {
                value = parsedDate.toISOString().split("T")[0]; // conservar original
              }
            }
          }

          acc[key] = value;
        }
        return acc;
      }, {});
      return newItem;
    });

    return dataFiltered;
  };

  const graphFilter = (fieldNumber) => {
    return data.map((item) =>
      Object.keys(item).reduce((acc, key) => {
        if (fieldNumber.includes(Object.keys(item).indexOf(key))) {
          acc[key] = item[key];
        }
        return acc;
      }, {})
    );
  };

  const repetAmountsList = () => {
    const importe = data.map((d) => d["Total general"]);
    const repetidos = {};
    importe.forEach((numero) => {
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });
    return repetidos;
  };

  const repetAmounts = repetAmountsList();

  return {
    fieldFilter,
    dataFilter,
    graphFilter,
    repetAmounts,
  };
};

export default useFilter;
