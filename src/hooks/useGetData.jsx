import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuthToken } from "../utils/authServices";

const useGetData = ({ url }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const dataUrl = `${API_URL}${url}`;
  const {
    data: data = [],
    isLoading: dataLoading,
    isRefetching: dataRefetching,
    refetch,
  } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axios.get(dataUrl, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      return res?.data;
    },
  });
  return { data, dataLoading, dataRefetching, refetch };
};

export default useGetData;
