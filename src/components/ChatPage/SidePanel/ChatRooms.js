import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  Input,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { FaRegSmileWink, FaPlus } from 'react-icons/fa';
import { setCurrentChatRoom } from '../../../redux/actions/chatRoom_action';
import firebase from '../../../firebase';

/**
 * Styled Component
 */
const ChatRoomsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

/**
 * Functional Component
 */
function ChatRooms() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roomRef, setRoomRef] = useState(firebase.database().ref('chatRooms'));

  /**
   * Handler for JSX
   */
  const [roomName, setRoomName] = useState('');
  const [roomDesc, setRoomDesc] = useState('');
  const user = useSelector((state) => state.user.currentUser);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(roomName, roomDesc)) addChatRoom();
  };

  /**
   * 1. Add chatting rooms when component mounted
   */
  const [chatRooms, setChatRooms] = useState([]);

  const getChatRooms = () => {
    roomRef.on('value', (dataSnapshot) => {
      const test = dataSnapshot.val();
      setChatRooms([...Object.values(test)]);
    });
  };
  const addChatRoomsListeners = () => {
    const chatRoomsArray = [];
    roomRef.on('child_added', (dataSnapshot) => {
      chatRoomsArray.push(dataSnapshot.val());
      setChatRooms(chatRoomsArray);
    });
  };
  const changeChatRoom = (room) => {
    dispatch(setCurrentChatRoom(room));
  };
  const renderChatRooms = useCallback(
    (chatRooms) => {
      if (chatRooms.length > 0) {
        return chatRooms.map((room) => {
          return (
            <li key={room.id} onClick={() => changeChatRoom(room)}>
              #{room.name}
            </li>
          );
        });
      }
    },
    [chatRooms]
  );

  useEffect(() => {
    getChatRooms();
    addChatRoomsListeners();
  }, []);

  /**
   * 2. Set first chatting room when first rendering
   */
  const [isMounted, setIsMounted] = useState(false);

  const setFirstChatRoom = () => {
    const firstChatRoom = chatRooms[0];
    dispatch(setCurrentChatRoom(firstChatRoom));
  };

  useEffect(() => {
    if (!isMounted && chatRooms.length > 0) {
      setFirstChatRoom();
      setIsMounted(true);
    }
  }, [chatRooms]);

  return (
    <>
      {console.log('RENDERING...')}
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

export default ChatRooms;
