import React, { useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

export function Login ({ onIdSubmit }) {
  const idRef = useRef(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onIdSubmit(idRef.current.value);
  }

  function generateNewId() {
    onIdSubmit(uuid());
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: '100vh' }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter your ID</Form.Label>
          <Form.Control type="text" ref={idRef}></Form.Control>
        </Form.Group>
        <Button type="submit" className='mr-2'>Login</Button>
        <Button onClick={generateNewId} variant="secondary">Create a New ID</Button>
      </Form>
    </Container>
  );
}
