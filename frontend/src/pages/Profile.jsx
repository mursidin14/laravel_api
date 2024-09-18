import { useEffect } from 'react';
import { UserIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "flowbite-react";
import { useStateContext } from "../contexts/ContextProvider";
import { axiosClient } from '../api/axios';

export default function Profile() {
   const { user, setUser, loadUser, setLoadUser } = useStateContext();
   
   useEffect(() => {
        setLoadUser(true);
        axiosClient.get('users/current')
        .then((response) => {
            setUser(response.data.data);
            setLoadUser(false);
        }).catch((error) => {
            console.log(error);
            setLoadUser(false);
        })
   }, []);
    
  return (
    <div className="w-full flex h-screen items-center justify-center">
        {
            loadUser ? <div className='w-1/4 min-h-96 bg-slate-200 animate-pulse rounded-md'></div>:
            user && 
            <Card className="w-1/4 mt-10">
    <div className="flex justify-end px-4 pt-4">
    </div>
    <div className="flex flex-col items-center pb-10">
      <UserIcon className='h-44' />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">{user.username}</span>
      <div className="mt-4 flex space-x-3 lg:mt-6">
        <Button
          className="inline-flex items-center rounded-lg bg-gray-700 px-4 text-center text-md font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Edit
        </Button>
      </div>
    </div>
  </Card>
        }
    </div>
  )
}
