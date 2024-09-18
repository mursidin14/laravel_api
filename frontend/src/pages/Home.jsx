import { useEffect, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';
import { Table, Pagination, Button } from "flowbite-react";
import { useStateContext } from '../contexts/ContextProvider';
import { axiosClient } from '../api/axios';
import { useParams } from 'react-router-dom';
import AddContactModal from '../components/contacts/AddContactModal';


export default function Home() {
  const [ contact, setContact ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ size, setSize ] = useState(10);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [total, setTotal] = useState(0);
  const { openModal, setOpenModal } = useStateContext();

  
  useEffect(() => {
    const getSearchContact = async() => {
      try {
        const response = await axiosClient.get('/contacts', {
          params: {
            page,
            size,
            name,
            email,
            phone,
          }
        })
        console.log(response.data)
        setContact(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getSearchContact()
  }, [])

  const handleBtnModal = () => {
    setOpenModal(!openModal);
  }


  return (
    <>
    <div className="flex w-full justify-center pt-24 px-4">
    <div className="w-full max-w-5xl">
      <TabGroup>
        <TabList className="flex gap-4 justify-between">
            <Tab
              className="rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black"
            >
              Contact
            </Tab>
            <Button onClick={handleBtnModal}>Add Contact</Button>
        </TabList>
        <TabPanels className="mt-3">
        <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>First name</Table.HeadCell>
            <Table.HeadCell>Last name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {
              contact.length <= 0 ? 
                <Table.Row className='flex h-20 justify-center items-center italic text-lg'>
                    Data Empty...
                </Table.Row> 
                :
              contact.map((item) => (
                <Table.Row 
                  key={item.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.firstname}
                  </Table.Cell>
                  <Table.Cell>{item.lastname}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.phone}</Table.Cell>
                  <Table.Cell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Edit
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))
            }
            
          </Table.Body>
        </Table>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination currentPage={page} totalPages={total} onPageChange={size} showIcons />
        </div>
      </div>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
  <AddContactModal />
  </>
  )
}
