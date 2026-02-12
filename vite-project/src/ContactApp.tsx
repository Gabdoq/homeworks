import { useState, useEffect } from 'react';
import type { Contact } from './types';
import Loader from './Loader';
import ContactList from './ContactList';
import ContactForm from './ContactForm';

const initialContacts: Contact[] = [
  { id: 1, name: 'Juan Pérez', phone: '555-1234' },
  { id: 2, name: 'María García', phone: '555-5678' },
  { id: 3, name: 'Carlos López', phone: '555-9012' },
];

function ContactApp() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  // Simular carga inicial de datos
  useEffect(() => {
    setTimeout(() => {
      setContacts(initialContacts);
      setLoading(false);
    }, 2000);
  }, []);

  const addContact = (name: string, phone: string) => {
    const newContact: Contact = {
      id: Date.now(),
      name,
      phone,
    };
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="contact-app">
      <h1>📱 Mis Contactos</h1>
      <ContactForm onAdd={addContact} />
      <ContactList contacts={contacts} onDelete={deleteContact} />
    </div>
  );
}

export default ContactApp;
