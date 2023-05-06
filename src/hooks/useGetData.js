import { useState, useEffect } from "react";
import { getFileUrl } from "../firebase.js";
import { useAuth } from "../context/authContext.jsx";

//fetch data from firebase storage and return it as a json object
const useGetData = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [urlFile, setUrlFile] = useState(null);

  const getDataJson = async (jsonFileName) => {
    const jsonData = await getFileUrl(user.uid, jsonFileName);
    return jsonData;
  };

  useEffect(() => {
    if (urlFile) {
      const getData = async () => {
        const response = await fetch(urlFile);
        const data = await response.json();
        setData(data);
      };
      getData();
    }
  }, [data]);

  return { getDataJson };
};

export default useGetData;
