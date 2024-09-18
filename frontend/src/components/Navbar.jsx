import { useEffect, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Link } from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider';
import { axiosClient } from '../api/axios';
import { Spinner } from 'flowbite-react';


const Menus = [
    {name:"Home", link:"/", current:true},
    {name:"Aboute", link:"/aboute", current:false},
]

export default function Navbar() {
    const { user, setUser, setToken, loadUser, setLoadUser } = useStateContext();
    const [load, setLoad] = useState(false);


    const handleLogout = (e) => {
        e.preventDefault();
        setLoad(true);
        axiosClient.delete('users/logout')
        .then(() => {
            setUser(null);
            setToken(null);
            window.location.reload();
         })
    }

    useEffect(() => {
            setLoadUser(true);
            axiosClient.get('/users/current')
            .then((response) => {
                setUser(response.data.data);
                setLoadUser(false);
            }).catch((err) => {
                console.log(err)
                setLoadUser(false);
            })
        }, []);


    return (
        <Disclosure as="nav" className="fixed top-0 left-0 right-0 bg-white z-10 shadow-xl">
         {
            load && 
            <div className='h-screen flex justify-center items-center'>
                <Spinner color={'gray'} size={'xl'} />
            </div>
         }
        <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
           </DisclosureButton>
          </div>
            <Link to="/" className="flex items-center">
                <p className="font-bold font-sans ml-2 text-md dark:text-white">Laravel_auth</p>
            </Link>
            <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-2 lg:space-x-8">
                    {
                        Menus.map(item => (    
                           <NavLink 
                            key={item.name} 
                            className={({isActive}) => isActive ? "text-blue-30 font-bold text-lg" : "text-slate-900 font-mono text-lg dark:text-white"} 
                            to={`${item.link}`}
                            >
                                {item.name}
                            </NavLink>
                        ))
                    }
                </div>
            </div>
            <div className="sm:ml-6">
                <div className="flex items-center space-x-2 lg:space-x-5 dark:text-white">
                    <Link to="/me">
                    <div className='flex'>
                        {  
                            loadUser ? 
                            <div className='bg-slate-200 w-32 h-6 animate-pulse rounded-md'></div> :
                            user && <span>{user.name}</span>
                        }
                          <UserIcon className="text-current h-6" />
                    </div>
                    </Link>
                    <button onClick={handleLogout} className='bg-white border rounded-md py-1 px-3'>
                        Logout
                    </button>
                </div>
            </div>
            </div>
            </div>
            <DisclosurePanel className="sm:hidden block">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {
                        Menus.map(item => (    
                         <NavLink
                            key={item.name} 
                            className={({isActive}) => isActive ? "text-blue-30 font-bold text-lg block" : "text-slate-900 font-mono text-lg block"} 
                            to={`${item.link}`}> 
                             {item.name}
                          </NavLink>
                        ))
                    }
                </div>
            </DisclosurePanel>
        </Disclosure>
      )
}
