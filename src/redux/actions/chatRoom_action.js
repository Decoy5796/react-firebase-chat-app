import { SET_CURRENT_CHAT_ROOM } from '../actions/types';

export function setCurrentChatRoom(currentChatRoom) {
  return {
    type: SET_CURRENT_CHAT_ROOM,
    payload: currentChatRoom,
  };
}
