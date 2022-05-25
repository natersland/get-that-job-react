import { useState } from "react";

function useToggle(initialValue = false) {
  // hook สำหรับเปิด-ปิด toggle
  // มีใส่ไว้ใน component ToggleCard ใน share component แล้ว ถ้าใช้ component ไม่ต้องใช้อีก
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggle };
}

export default useToggle;
