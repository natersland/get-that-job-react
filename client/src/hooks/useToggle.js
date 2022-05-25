import { useState } from "react";

function useToggle(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggle };
}

export default useToggle;
