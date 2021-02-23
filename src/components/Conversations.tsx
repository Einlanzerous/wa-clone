import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';

export interface Message {
  sender: string;
  text: string;
}

export interface Conversation {
  recipients: string[];
  messages: Message[];
}

export function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <ListGroup variant="flush">
      {conversations.map((conversations, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversations.selected}
        >
          {conversations.recipients
            .map((recipient) => recipient.name)
            .join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
