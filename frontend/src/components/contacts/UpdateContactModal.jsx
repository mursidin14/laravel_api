import { useState } from 'react';
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { axiosClient } from '../../api/axios';
import { useStateContext } from '../../contexts/ContextProvider';

export default function UpdateContactModal() {
    const { openModal, setOpenModal } = useStateContext();
    const [contact, setContact] = useState({
        firstname:'',
        lastname:'',
        email:'',
        phone:'',
      });

      const handleBtnUpdate = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
      }

      const updateContact = (e) => {
        e.preventDefault();
          axiosClient.put('/contacts', contact)
          .then(() => {
            setOpenModal(false);
            window.location.pathname = '/';
          }).catch((err) => {
            console.log(err)
          })
      }

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
    <div className="p-4">
    <Modal.Header>Tambah Contact</Modal.Header>
    <div className="w-full max-w-5xl">
          <div className="space-y-6">
            <form onSubmit={updateContact}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="firstname" value="First name" />
              </div>
              <TextInput
                id="firstname"
                placeholder="firstname"
                name='firstname'
                type='text'
                value={contact.firstname}
                onChange={handleBtnUpdate}
                required
              />
            </div>
            <div>
            <div className="mb-2 block">
              <Label htmlFor="lastname" value="Last name" />
            </div>
            <TextInput
              id="lastname"
              placeholder="lastname"
              name='lastname'
              type='text'
              value={contact.lastname}
              onChange={handleBtnUpdate}
              required
            />
          </div>
          <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            placeholder="name@company.com"
            name='email'
            type='email'
            value={contact.email}
            onChange={handleBtnUpdate}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Phone" />
          </div>
          <TextInput
            id="phone"
            placeholder="0823xxx"
            name='phone'
            type='telp'
            value={contact.phone}
            onChange={handleBtnUpdate}
            required
          />
        </div>
              <Button className='mt-2' type='submit'>save</Button>
            </form>
          </div>
    </div>
    </div>
    </Modal>
  )
}
