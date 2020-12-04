import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IoIosChatboxes } from 'react-icons/io';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuGroup,
  MenuItem,
  Wrap,
  WrapItem,
  Avatar,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import firebase from '../../../firebase';

const Logo = styled.h3`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  & > svg {
    margin-right: 10px;
  }
`;

export default function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <Logo>
        <IoIosChatboxes /> Chat App
      </Logo>
      <Wrap>
        <WrapItem>
          <Avatar name={user && user.displayName} src={user && user.photoURL} />
        </WrapItem>
        <WrapItem>
          <Menu size='sm'>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {user && user.displayName}
            </MenuButton>
            <MenuList>
              <MenuGroup>
                <MenuItem>프로필 사진 변경</MenuItem>
                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </WrapItem>
      </Wrap>
    </>
  );
}
