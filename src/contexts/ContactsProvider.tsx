import React, { useContext } from 'react';
import { contact } from '../components/Contacts';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ContactsContext = React.createContext(null);

export function useContacts () {
  return useContext(ContactsContext);
}

export function ContactsProvider ({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  function createContact(id: string, name: string) {
    setContacts((prevContacts: contact[]) => {
      return [...prevContacts, { id, name }];
    });
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
