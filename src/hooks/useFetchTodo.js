import { useEffect, useState } from "react";
import axiosTodo from "../helpers/api/axiosTodo";

const useFetchApi = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchApi() {
      try {
        const resData = await axiosTodo.get(url);
        setData(resData.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchApi();
  }, [url]);
  return {
    data,
    setData,
    loading,
    setLoading,
  };
};

export default useFetchApi;
