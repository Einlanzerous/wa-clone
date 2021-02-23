import React, { useContext, useState } from 'react';
import { Conversation, Message } from '../components/Conversations';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext(null);

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    'conversations',
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();

  function createConversation(recipients) {
    setConversations((prevConversations: Conversation[]) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  function addMessageToConversation({ recipients, text, sender }) {
    setConversations((prevConversations) => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          };
        }

        return conversation;
      });

      if (madeChange) {
        return newConversations;
      } else {
        return [...prevConversations, { recipients, messages: [newMessage] }];
      }
    });
  }

  function sendMessage(recipients, text) {
    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map(
    (conversation: Conversation, index) => {
      const recipients = conversation.recipients.map((recipient) => {
        const contact = contacts.find((contact) => {
          return contact.id === recipient;
        });
        const name = (contact && contact.name) || recipient;
        return { id: recipient, name };
      });

      const messages = conversation.messages.map((message: Message) => {
        const contact = contacts.find((contact) => {
          return contact.id === message.sender;
        });
        const name = (contact && contact.name) || message.sender;
        const fromMe = id === message.sender;

        return { ...message, senderName: name, fromMe };
      })

      const selected = index === selectedConversationIndex;

      return { ...conversation, messages, recipients, selected };
    }
  );

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

// Verify that the arrays are exactly equal
function arrayEquality(arrA, arrB) {
  if (arrA.length !== arrB.length) return false;

  arrA.sort();
  arrB.sort();

  return arrA.every((element, index) => {
    return element === arrB[index];
  });
}
