import { useEffect, useState } from "react";
import { useApiGungu } from "../../api/useApi";

export const useApiSelect = (valueKey = 'id', labelKey = 'name') => {
  const [list, setList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await useApiGungu();
        setList(res.data.body);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = list.map(item => ({
    id: item[valueKey],
    name: item[labelKey]
  }));

  return {
    options,
    selectedValue,
    setSelectedValue,
    loading,
    rawList: list
  };
};