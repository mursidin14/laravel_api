import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function GuestLayout() {

    const { token } = useStateContext();

    if(!token){
        return <Navigate to="/login" />
    }

  return (
    <>
        <Navbar />
        <main>
            <Outlet />
        </main>
        <Footer />          
    </>
  )
}
