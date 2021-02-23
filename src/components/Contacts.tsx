import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';

export interface contact {
  name: string;
  id: string;
}

export function Contacts () {
  const { contacts } = useContacts();

  return (
    <ListGroup variant='flush'>
      {contacts.map((contact: contact) => (
        <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
