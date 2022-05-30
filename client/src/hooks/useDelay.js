import { useState } from "react";

function useDelay(initialValue = false) {
  const [isDelay, setIsDelay] = useState(initialValue);

  return { isDelay, setIsDelay };
}

export default useDelay;
