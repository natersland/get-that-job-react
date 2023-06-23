import { useUtils } from "../../contexts/utilsContext";
import LoginContentPage from "./components/login/login_content_page";
import LoginLoadingPage from './components/login/login_loading_page'
import AlertDialog from "../../components/Utilities/AlertDialog";
import { useVadilation } from "../../contexts/vadilation";


export default function LoginPage() {
  const { loading } = useUtils();
    const { isErrorPassword, isErrorEmail, isValidAccount } = useVadilation();
  
  return (
    <>
    <AlertDialog />
    {loading ? <LoginLoadingPage />: <LoginContentPage/>}
    </>
    
  );
}
