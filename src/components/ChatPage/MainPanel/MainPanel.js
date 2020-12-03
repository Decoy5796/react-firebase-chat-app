import React, { Component } from 'react';
import styled from 'styled-components';

import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';
import Message from './Message';

const Wrapper = styled.div`
  padding: 2rem 2rem 0 2rem;
`;
const MessageArea = styled.div`
  width: 100%;
  height: 450px;
  border: 0.2rem solid #ececec;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow-y: auto;
`;

export class MainPanel extends Component {
  render() {
    return (
      <Wrapper>
        <MessageHeader />
        <MessageArea />
        <MessageForm />
      </Wrapper>
    );
  }
}

export default MainPanel;
