import { useNav } from "../contexts/navigate";
const useCheckLocation = (currentLocation, conditionLocation, index) => {
  const { setMenuIndex } = useNav();
  // detect user refresh page ----------------------------
  const checkUserPage = () => {
    if (currentLocation === `${conditionLocation}`) {
      setMenuIndex(index);
    }
  };
  return { checkUserPage };
};

export default useCheckLocation;
