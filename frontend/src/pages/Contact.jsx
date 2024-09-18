import { useEffect } from 'react';
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';
import { Table } from "flowbite-react";
import { useStateContext } from '../contexts/ContextProvider';
import { axiosClient } from '../api/axios';
import { useParams } from 'react-router-dom';


export default function Contact() {
  const { user, setUser } = useStateContext();
  const { id } = useParams();

  
  useEffect(() => {
    const getContactById = async() => {
      try {
        const response = await axiosClient.get(`/contacts?1=10`)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    getContactById()
  }, [id])


  return (
    <div className="flex h-screen w-full justify-center pt-24 px-4">
    <div className="w-full max-w-5xl">
      <TabGroup>
        <TabList className="flex gap-4">
            <Tab
              className="rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black"
            >
              Contact
            </Tab>
        </TabList>
        <TabPanels className="mt-3">
        <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Color</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {'Apple MacBook Pro 17"'}
              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
              <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Microsoft Surface Pro
              </Table.Cell>
              <Table.Cell>White</Table.Cell>
              <Table.Cell>Laptop PC</Table.Cell>
              <Table.Cell>$1999</Table.Cell>
              <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</Table.Cell>
              <Table.Cell>Black</Table.Cell>
              <Table.Cell>Accessories</Table.Cell>
              <Table.Cell>$99</Table.Cell>
              <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
  )
}
