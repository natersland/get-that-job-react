import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  // hook เอาไว้ใช้ fecth ข้อมูลต่างๆได้ทุกอย่าง
  // ตัวอย่างการใช้ ไปดูได้ที่ pages -> Professional -> SeeMorePage
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return { data, reFetch };
};

export default useFetch;
