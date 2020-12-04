import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import mime from 'mime-types';
import firebase from '../../../firebase';
import { setPhotoURL } from '../../../redux/actions/user_action';

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
const HiddenInput = styled.input`
  display: none;
`;

export default function UserPanel() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const inputOpenImageRef = useRef();

  const handleLogout = () => {
    firebase.auth().signOut();
  };
  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const metadata = { contentType: mime.lookup(file.name) };

    try {
      const uploadTaskSnapshot = await firebase
        .storage()
        .ref()
        .child(`user_image/${user.uid}`)
        .put(file, metadata);

      const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
      await firebase.auth().currentUser.updateProfile({
        photoURL: downloadURL,
      });
      dispatch(setPhotoURL(downloadURL));

      await firebase
        .database()
        .ref('users')
        .child(user.uid)
        .update({ image: downloadURL });
    } catch (err) {
      console.log(err);
    }
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
                <MenuItem onClick={handleOpenImageRef}>
                  프로필 사진 변경
                </MenuItem>
                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </WrapItem>
      </Wrap>
      <HiddenInput
        accept='image/jpeg, image/png'
        type='file'
        ref={inputOpenImageRef}
        onChange={handleUploadImage}
      />
    </>
  );
}
