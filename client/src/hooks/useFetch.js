import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useFetch = (url) => {
  // hook เอาไว้ใช้ fecth ข้อมูลต่างๆได้ทุกอย่าง
  // ตัวอย่างการใช้ ไปดูได้ที่ pages -> Professional -> SeeMorePage
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
