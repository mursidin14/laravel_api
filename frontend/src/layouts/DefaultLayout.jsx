import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";


export default function DefaultLayout() {

    const { token } = useStateContext();
    
    if(token){
        return <Navigate to="/" />
    }

  return (
    <>
        <main>
            <Outlet />
        </main>
    </>
  )
}
