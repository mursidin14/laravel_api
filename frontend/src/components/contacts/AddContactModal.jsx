import { useState } from 'react';
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { axiosClient } from '../../api/axios';
import { useStateContext } from '../../contexts/ContextProvider';

export default function About() {
  const { modalUpdate, setModalUpdate } = useStateContext();
  const [contact, setContact] = useState({
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]:e.target.value
    })
  }

  const addContact = (e) => {
    e.preventDefault();
      axiosClient.post('/contacts', contact)
      .then(() => {
        modalUpdate(false);
        window.location.pathname = '/';
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <Modal show={modalUpdate} onClose={() => setModalUpdate(false)}>
    <div className="p-4">
    <Modal.Header>Tambah Contact</Modal.Header>
    <div className="w-full max-w-5xl">
          <div className="space-y-6">
            <form onSubmit={addContact}>
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
                onChange={handleChange}
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
              onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
