import styled from "@emotion/styled";
function RoleButton({ text, isSelect }) {
  return <Button isSelect={isSelect}>{text}</Button>;
}

// ------------------- CSS Style Component Zone -------------------

const Button = styled.button`
  font-size: 0.875rem;
  font-weight: 600;
  font-family: var(--seconary-font);
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1.25px;
  border: 0;
  cursor: pointer;

  margin-right: 1rem;
  margin-top: 0.8rem;
  padding-bottom: 0.5rem;

  border-bottom: ${(props) =>
    props.isSelect
      ? "2.5px solid var(--secoundary-brand-color)"
      : "2.5px solid #BDBDBD"};
  /*     border-bottom: 2.5px solid var(--secoundary-brand-color);
    
 */

  color: ${(props) =>
    props.isSelect ? "var(--primary-text-color)" : "#8E8E8E"};
`;

export default RoleButton;
