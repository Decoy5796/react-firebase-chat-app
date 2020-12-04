import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { FaRegSmileWink, FaPlus } from 'react-icons/fa';
import firebase from '../../../firebase';

const ChatRoomsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export default function ChatRooms() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roomName, setRoomName] = useState('');
  const [roomDesc, setRoomDesc] = useState('');
  const [roomRef, setRoomRef] = useState(firebase.database().ref('chatRooms'));
  const [chatRooms, setChatRooms] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(roomName, roomDesc)) {
      addChatRoom();
    }
  };

  const isFormValid = (name, desc) => {
    return name && desc;
  };

  const addChatRoom = async () => {
    const key = roomRef.push().key;
    const newChatRoom = {
      id: key,
      name: roomName,
      description: roomDesc,
      createdBy: {
        name: user.displayName,
        image: user.photoURL,
      },
    };

    try {
      await roomRef.child(key).update(newChatRoom);
      setRoomName('');
      setRoomDesc('');
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const addChatRoomsListeners = () => {
    const chatRoomsArray = [];
    roomRef.on('child_added', (dataSnapshot) => {
      chatRoomsArray.push(dataSnapshot.val());
      setChatRooms(chatRoomsArray);
    });
  };

  const renderChatRooms = (chatRooms) => {
    if (chatRooms.length > 0) {
      return chatRooms.map((room) => <li key={room.id}>#{room.name}</li>);
    }
  };

  useEffect(() => {
    addChatRoomsListeners();
  }, []);

  return (
    <>
      <Flex align='center' justify='space-between' onClick={onOpen}>
        <Flex align='center' justify='center'>
          <FaRegSmileWink />
          Chat rooms
        </Flex>
        <FaPlus />
      </Flex>
      <ChatRoomsList>{renderChatRooms(chatRooms)}</ChatRoomsList>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a chat room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb={'10px'}>
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
                  placeholder='Enter a chat room name'
                  onChange={(e) => {
                    setRoomName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl mb={'10px'}>
                <FormLabel>Description</FormLabel>
                <Input
                  type='text'
                  placeholder='Enter a chat room description'
                  onChange={(e) => {
                    setRoomDesc(e.target.value);
                  }}
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
