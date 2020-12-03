import React from 'react';
import styled from 'styled-components';

import ChatRooms from './ChatRooms';
import DirectMessages from './DirectMessages';
import Favorited from './Favorited';
import UserPanel from './UserPanel';

const Wrapper = styled.div`
  width: 100%;
  background-color: #7b83eb;
  min-height: 100vh;
  padding: 2rem;
  color: white;
`;

function SidePanel() {
  return (
    <Wrapper>
      <UserPanel />
      <Favorited />
      <ChatRooms />
      <DirectMessages />
    </Wrapper>
  );
}

export default SidePanel;
