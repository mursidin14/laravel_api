import { useEffect, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';
import { Table, Pagination, Button } from "flowbite-react";
import { useStateContext } from '../contexts/ContextProvider';
import { axiosClient } from '../api/axios';
// import { useParams, Link } from 'react-router-dom';
import AddContactModal from '../components/contacts/AddContactModal';
import UpdateContactModal from '../components/contacts/UpdateContactModal';


export default function Home() {
  const { openModal, setOpenModal, modalUpdate, setModalUpdate } = useStateContext();
  const [ contact, setContact ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ lastPage, setLastPage ] = useState(1);
  const [total, setTotal] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [load, setLoad] = useState(false);

  
  const getSearchContact = async() => {
    setLoad(true)
    try {
      const response = await axiosClient.get('/contacts', {
        params: {
          page,
          lastPage,
          name,
          email,
          phone,
        }
      })
      
      setFrom(response.data.meta.from);
      setTo(response.data.meta.to);
      setLastPage(response.data.meta.last_page);
      setTotal(response.data.meta.total);
      setPage(response.data.meta.current_page);
      setContact(response.data.data);
      setLoad(false);
    } catch (error) {
      console.log(error)
      setLoad(false)
    }
  }

  const onPageChange = (page) => setPage(page);

  useEffect(() => {
    getSearchContact();
  }, [page, name, email, phone])

  const handleBtnModal = () => {
    setOpenModal(!openModal);
  }

  const handleBtnUpdateModal = () => {
    setModalUpdate(!modalUpdate);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getSearchContact();
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
        <form onSubmit={handleSearch} className='mt-3 flex gap-4'>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='name'
              className='border rounded p-2 w-full'
            />
            <input 
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='email'
              className="border rounded p-2 w-full"
            />
            <input 
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='phone'
              className='border rounded p-2 w-full'
            />
        </form>
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
              load ? <Table.Row className='flex h-20 justify-center items-center italic text-lg'>
                Loading...
          </Table.Row> :
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
                    {/*<Link to="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Edit
                    </Link>*/}
                    <Button onClick={() => handleBtnUpdateModal(item.id)}>Edit</Button>
                  </Table.Cell>
                </Table.Row>
              ))
            }
            
          </Table.Body>
        </Table>
        <div className='flex justify-center'>
            <p>Showing {from} to {to} of {total} contacts</p>
        </div>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination currentPage={page} totalPages={lastPage} onPageChange={onPageChange} showIcons />
        </div>
      </div>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
  <AddContactModal />
  <UpdateContactModal />
  </>
  )
}
