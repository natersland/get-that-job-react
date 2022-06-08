import * as React from "react";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// Hooks -----------------------------------
import useToggle from "../../hooks/useToggle";

// component for professional & recruiter
// วิธีใช้: จะมี propsให้ 4 อัน เลื่อนไปดูคำอธิบายบรรทัดที่ 75 ได้เลย

// เป็น fx เปลี่ยนสไตล์ของ radio ไม่ต้องปรับ
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px #f48fb1, inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : null,
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto #f48fb1",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

// เป็น fx เปลี่ยนสไตล์ของ radio ไม่ต้องปรับ
const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: null,
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#f48fb1,#f48fb1 40%,transparent 50%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#fff",
  },
});

// เป็น fx เปลี่ยนสไตล์ของ radio ไม่ต้องปรับ
function BpRadio(props) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export default function RadioFilter({
  formlabel, // header ของปุ่ม radio
  radioData, // อันนี้ให้ส่งข้อมูลมาเป็น array ดูตัวอย่างได้ที่ pages -> Professional -> ApplicationsPage -> บรรทัดที่ 60-66
  stateVariable, // state ที่ใช้เก็บค่า value ของ radio ตอน user เลือก
  setStateVariable, // state ที่ใช้ set ค่า value ของ radio ตอน user เลือก
}) {
  const { setIsOpen } = useToggle();

  return (
    <FormControl>
      <FormLabel id="redio-filter">{formlabel}</FormLabel>
      <RadioGroup
        defaultValue="all"
        aria-labelledby="redio-filter"
        name="redio-filter"
        sx={{
          display: "inline",
        }}
      >
        {radioData.map((item, index) => {
          const { value, label } = item;

          return (
            <FormControlLabel
              key={index}
              value={value}
              control={<BpRadio />}
              label={label}
              onChange={(e) => setStateVariable(e.target.value)}
              onClick={() => {
                setIsOpen(false);
              }}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
