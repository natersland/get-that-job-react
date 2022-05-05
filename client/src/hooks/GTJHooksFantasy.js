import { useState } from "react";

export default function GTJHooksFantasy() {
  const [roleBtn, setRoleBtn] = useState("professional".toLocaleLowerCase());
  return { roleBtn, setRoleBtn };
}
