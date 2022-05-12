import styled from "@emotion/styled";

import nadata from "../../data/naData"
const CloseButton = () => {
  const closeStatus = (index) => {
    nadata[index].jobsStatus = false; 
    console.log(nadata[index])
  };
  return (
    <div>
      {nadata.map((items, index) => {
        const { jobTitle, jobsStatus } = items;
        return (
          <div key={index}>
            <p>{jobTitle}</p>
            <p>{String(jobsStatus)}</p>
        <CloseButtonJaaaa
          className="btn btn-md"
          isActive={nadata.jobsStatus}
          type="button"
          onClick={() => {
            closeStatus(index);
          }}
        >
          Close
        </CloseButtonJaaaa>
          </div>
        );
      })}
      
    </div>
  );
};

const CloseButtonJaaaa = styled.button`
background-color: ${(props) =>
    props.isActive ? "var(--primary-brand-color)" : "var(--tertiary-text-color)"};
`


export default CloseButton;
/* 
<button
className="btn btn-md bg-red-300"
type="button"
onClick={() => {
  closeStatus(index);
}}
disabled
>
Close
</button> */