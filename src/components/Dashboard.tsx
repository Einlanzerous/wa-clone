import React from 'react';
import { useConversations } from '../contexts/ConversationsProvider';
import { OpenConversation } from './OpenConversation';
import { SideBar } from './Sidebar';

export function Dashboard({ id }) {
  const { selectedConversation } = useConversations();

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <SideBar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
}
