import React from 'react';
import styled from 'styled-components';

import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';

const FlexWrap = styled.div`
  display: flex;
  background: #fff;

  & > div:nth-child(1) {
    width: 300px;
  }
  & > div:nth-child(2) {
    width: 100%;
  }
`;

function ChatPage() {
  return (
    <FlexWrap>
      <div>
        <SidePanel />
      </div>
      <div>
        <MainPanel />
      </div>
    </FlexWrap>
  );
}

export default ChatPage;
