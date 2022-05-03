import { useState } from "react";

export default function GTJHooksFantasy() {
  const [userRole, setUserRole] = useState("professional");
  return { userRole, setUserRole };
}
